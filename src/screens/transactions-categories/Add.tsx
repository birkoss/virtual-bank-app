import React, { useState, useEffect, useContext } from "react";

import { useForm } from "react-hook-form";

import { useStyleSheet, Layout } from "@ui-kitten/components";

import Screen from "../../components/Screen";
import Input from "../../components/Input";

import ButtonLoading from "../../components/ButtonLoading";
import { KeyboardAvoidingView } from "../../components/KeyboardAvoidingView";

import { TransactionsCategoriesScreenNavigationProp } from "../../types";

import { APIAddTransactionsCategories } from "../../api";
import { FormStyles } from "../../styles";

import { UserContext } from "../../contexts";
import { Alert } from "react-native";

type Props = {
    navigation: TransactionsCategoriesScreenNavigationProp;
};

type formData = {
    name: string;
};

const defaultValues = {
    name: "",
};

export default function TransactionsCategoriesAddScreen({ navigation }: Props) {
    const { state } = useContext(UserContext);
    const formStyles = useStyleSheet(FormStyles);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, register, setValue, handleSubmit } = useForm<formData>({
        defaultValues,
    });

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);

        APIAddTransactionsCategories(state.token, data)
            .then((data) => {
                setIsSubmitting(false);
                navigation.pop();
            })
            .catch((error) => {
                setIsSubmitting(false);
                Alert.alert(error.message);
            });
    };

    useEffect(() => {
        register({ name: "name" }, { required: "Name is mandatory", min: 8 });
    }, [register]);

    return (
        <Screen
            mainActionType="back"
            isLoading={false}
            navigation={navigation}
            title="Add a New Transaction Category"
        >
            <KeyboardAvoidingView>
                <Layout style={formStyles.formContainerInputs} level="1">
                    <Input
                        placeholder="Name"
                        onChangeText={(text: string) =>
                            setValue("name", text, true)
                        }
                        error={errors.name}
                    />
                </Layout>
                <Layout style={formStyles.formContainerButtons} level="1">
                    <ButtonLoading
                        isSubmitting={isSubmitting}
                        onPress={handleSubmit(onSubmit)}
                        label="CREATE"
                    />
                </Layout>
            </KeyboardAvoidingView>
        </Screen>
    );
}
