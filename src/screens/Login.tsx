import React, { Component } from "react";
import { View, Alert } from "react-native";

import {
    Button,
    Layout,
    StyleService,
    Text,
    useStyleSheet,
} from "@ui-kitten/components";

import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import Input from "../components/Input";

import { LoginScreenNavigationProp } from "../types";

type Props = {
    navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
    const styles = useStyleSheet(themedStyles);

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
                <Input placeholder="Email" />
                <Input style={styles.passwordInput} placeholder="Password" />
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
            <Button style={styles.primaryActionButton} size="giant">
                SIGN IN
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

const themedStyles = StyleService.create({
    container: {
        backgroundColor: "background-basic-color-1",
        flex: 1,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 216,
        backgroundColor: "color-primary-default",
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    subtitle: {
        marginTop: 16,
    },
    primaryActionButton: {
        marginHorizontal: 16,
    },
    secondaryActionButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    passwordInput: {
        marginTop: 16,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
});
