import React, { useEffect, useState, useContext } from "react";
import { View, Alert } from "react-native";

import { Button, Layout, Text, useStyleSheet } from "@ui-kitten/components";

import { useForm } from "react-hook-form";

import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import Input from "../components/Input";
import ButtonLoading from "../components/ButtonLoading";

import { RegisterScreenNavigationProp } from "../types";

import { LandingStyles } from "../styles";

import { validateEmail, validatePasswordConfirmation } from "../validations";

import { APIRegister } from "../api";
import { UserContext } from "../contexts";

type Props = {
    navigation: RegisterScreenNavigationProp;
};

type formData = {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstname: string;
    lastname: string;
};

const defaultValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
    firstname: "",
    lastname: "",
};

export default function RegisterScreen({ navigation }: Props) {
    const { dispatch } = useContext(UserContext);

    const { errors, register, setValue, handleSubmit, watch } = useForm<
        formData
    >({
        defaultValues,
    });

    const styles = useStyleSheet(LandingStyles);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        register(
            { name: "email" },
            {
                required: "Email is mandatory",
                validate: (value) => validateEmail(value) || true,
            }
        );
        register(
            { name: "password" },
            { required: "Password is mandatory", min: 8 }
        );
        register(
            { name: "passwordConfirmation" },
            {
                required: "Password confirmation is mandatory",
                min: 8,
                validate: (value) =>
                    validatePasswordConfirmation(value, watch("password")) ||
                    true,
            }
        );
        register(
            { name: "firstname" },
            { required: "Firstname is mandatory", min: 8 }
        );
        register(
            { name: "lastname" },
            { required: "Lastname is mandatory", min: 8 }
        );
    }, [register]);

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);

        APIRegister(data.email, data.password, data.firstname, data.lastname)
            .then(onSubmitSuccess)
            .catch((error) => {
                onSubmitFailed(error);
            });
    };

    const onSubmitSuccess = (data: any) => {
        setIsSubmitting(false);
        dispatch({
            type: "LOGIN",
            payload: {
                token: data["token"],
            },
        });
    };

    const onSubmitFailed = (error: any) => {
        setIsSubmitting(false);
        Alert.alert(error.message);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text category="h1" status="control">
                    Walleteur
                </Text>
                <Text style={styles.subtitle} category="s1" status="control">
                    Create a new account for free
                </Text>
            </View>
            <Layout style={styles.formContainer} level="1">
                <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text: string) =>
                        setValue("email", text, true)
                    }
                    error={errors.email}
                />

                <Input
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(text: string) =>
                        setValue("password", text, true)
                    }
                    placeholder="Password"
                    error={errors.password}
                />

                <Input
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(text: string) =>
                        setValue("passwordConfirmation", text, true)
                    }
                    placeholder="Password Confirmation"
                    error={errors.passwordConfirmation}
                />

                <Input
                    placeholder="Firstname"
                    style={styles.input}
                    onChangeText={(text: string) =>
                        setValue("firstname", text, true)
                    }
                    error={errors.firstname}
                />

                <Input
                    placeholder="Lastname"
                    style={styles.input}
                    onChangeText={(text: string) =>
                        setValue("lastname", text, true)
                    }
                    error={errors.lastname}
                />
            </Layout>
            <ButtonLoading
                isSubmitting={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                label="REGISTER"
                style={[styles.primaryActionButton, styles.input]}
            />
            <Button
                style={styles.secondaryActionButton}
                appearance="ghost"
                status="basic"
                onPress={() => navigation.navigate("Login")}
            >
                Already have an account ? Log in
            </Button>
        </KeyboardAvoidingView>
    );
}
