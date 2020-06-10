import React, { useEffect } from "react";
import { View, Alert } from "react-native";

import { Button, Layout, Text, useStyleSheet } from "@ui-kitten/components";

import { useForm } from "react-hook-form";

import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";

import { LoginScreenNavigationProp } from "../types";

import { onePagerStyles } from "../styles/onePagerStyles";

import { validateEmail } from "../validations";

type Props = {
    navigation: LoginScreenNavigationProp;
};

type formData = {
    email: string;
    password: string;
};

const defaultValues = {
    email: "",
    password: "",
};

export default function LoginScreen({ navigation }: Props) {
    const { errors, register, setValue, handleSubmit } = useForm<formData>({
        defaultValues,
    });

    const styles = useStyleSheet(onePagerStyles);

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
    }, [register]);

    const onSubmit = (data: formData) => {
        console.log(data);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text category="h1" status="control">
                    Virtual Bank
                </Text>
                <Text style={styles.subtitle} category="s1" status="control">
                    Sign in to your account
                </Text>
            </View>
            <Layout style={styles.formContainer} level="1">
                <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text: string) =>
                        setValue("email", text, true)
                    }
                />

                <ErrorMessage errors={errors} name="email" />
                <Input
                    style={styles.passwordInput}
                    secureTextEntry
                    onChangeText={(text: string) =>
                        setValue("password", text, true)
                    }
                    placeholder="Password"
                />
                <ErrorMessage errors={errors} name="password" />
                <View style={styles.forgotPasswordContainer}>
                    <Button
                        style={styles.forgotPasswordButton}
                        appearance="ghost"
                        status="basic"
                        onPress={() => Alert.alert("TODO")}
                    >
                        Forgot your password?
                    </Button>
                </View>
            </Layout>
            <Button
                style={styles.primaryActionButton}
                size="giant"
                onPress={handleSubmit(onSubmit)}
            >
                LOGIN
            </Button>
            <Button
                style={styles.secondaryActionButton}
                appearance="ghost"
                status="basic"
                onPress={() => navigation.navigate("Register")}
            >
                New here? Create an account
            </Button>
        </KeyboardAvoidingView>
    );
}
