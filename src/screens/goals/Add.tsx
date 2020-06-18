import React, { useState, useEffect, useContext } from "react";

import { useForm, Controller } from "react-hook-form";

import { useStyleSheet, Layout, CheckBox, Text } from "@ui-kitten/components";

import Screen from "../../components/Screen";
import Input from "../../components/Input";

import ButtonLoading from "../../components/ButtonLoading";
import { KeyboardAvoidingView } from "../../components/KeyboardAvoidingView";

import { GoalsScreenNavigationProp } from "../../types";

import { APIAddGoal } from "../../api";
import { FormStyles } from "../../styles";

import { validateAmount } from "../../validations";
import { UserContext } from "../../contexts";
import { Alert } from "react-native";

type Props = {
    navigation: GoalsScreenNavigationProp;
};

type formData = {
    name: string;
    amount: string;
};

const defaultValues = {
    name: "",
    amount: "",
};

export default function GoalsAddScreen({ navigation }: Props) {
    const { state } = useContext(UserContext);
    const formStyles = useStyleSheet(FormStyles);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, register, setValue, handleSubmit, control } = useForm<
        formData
    >({
        defaultValues,
    });

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);

        APIAddGoal(state.token, data)
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
        register(
            { name: "amount" },
            {
                required: "Amount is mandatory",
                validate: (value) => validateAmount(value) || true,
            }
        );
        register({ name: "name" }, { required: "Name is mandatory", min: 8 });
    }, [register]);

    return (
        <Screen
            mainActionType="back"
            isLoading={false}
            navigation={navigation}
            title="Add a New Goal"
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

                    <Input
                        placeholder="Amount"
                        onChangeText={(text: string) =>
                            setValue("amount", text, true)
                        }
                        error={errors.amount}
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
