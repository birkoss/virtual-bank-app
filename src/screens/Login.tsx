import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";

import {
    Button,
    Layout,
    Text,
    useStyleSheet,
    Spinner,
} from "@ui-kitten/components";

import { useForm } from "react-hook-form";

import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import ButtonLoading from "../components/ButtonLoading";

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
    }, [register]);

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);
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

                <ErrorMessage field={errors.email} />
                <Input
                    style={styles.passwordInput}
                    secureTextEntry
                    onChangeText={(text: string) =>
                        setValue("password", text, true)
                    }
                    placeholder="Password"
                />
                <ErrorMessage field={errors.password} />
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
            <ButtonLoading
                isSubmitting={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                label="LOGIN"
                style={styles.primaryActionButton}
            />
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
