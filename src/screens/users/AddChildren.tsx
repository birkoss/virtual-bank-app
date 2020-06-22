import React, { useState, useEffect, useContext } from "react";

import { useForm } from "react-hook-form";

import { useStyleSheet, Layout } from "@ui-kitten/components";

import Screen from "../../components/Screen";
import Input from "../../components/Input";

import ButtonLoading from "../../components/ButtonLoading";
import { KeyboardAvoidingView } from "../../components/KeyboardAvoidingView";

import { UsersScreenNavigationProp } from "../../types";

import { APIAddUser } from "../../api";
import { FormStyles } from "../../styles";

import { UserContext } from "../../contexts";
import { Alert } from "react-native";

type Props = {
    navigation: UsersScreenNavigationProp;
};

type formData = {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    isChildren: boolean;
};

const defaultValues = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    isChildren: true,
};

export default function UsersAddChildrenScreen({ navigation }: Props) {
    const { state } = useContext(UserContext);
    const formStyles = useStyleSheet(FormStyles);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, register, setValue, handleSubmit } = useForm<formData>({
        defaultValues,
    });

    const onSubmit = (data: formData) => {
        data.isChildren = true;
        data.lastname = "Children";

        if (state.account !== undefined) {
            let timestamp = new Date().getTime();
            data.email = "chd-" + timestamp + "-" + state.account?.email;
            data.password = timestamp.toString();
        }

        setIsSubmitting(true);

        APIAddUser(state.token, data)
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
            { name: "firstname" },
            { required: "Alias is mandatory", min: 8 }
        );
    }, [register]);

    return (
        <Screen
            mainActionType="back"
            isLoading={false}
            navigation={navigation}
            title="Add a New Children Account"
        >
            <KeyboardAvoidingView>
                <Layout style={formStyles.formContainerInputs} level="1">
                    <Input
                        placeholder="Alias"
                        onChangeText={(text: string) =>
                            setValue("firstname", text, true)
                        }
                        error={errors.firstname}
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
