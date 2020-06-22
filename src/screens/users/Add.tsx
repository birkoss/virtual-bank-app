import React, { useState, useEffect, useContext } from "react";

import { useForm, Controller } from "react-hook-form";

import {
    useStyleSheet,
    Layout,
    CheckBox,
    Text,
    TabView,
    Tab,
} from "@ui-kitten/components";

import Screen from "../../components/Screen";
import Input from "../../components/Input";

import ButtonLoading from "../../components/ButtonLoading";
import { KeyboardAvoidingView } from "../../components/KeyboardAvoidingView";

import { UsersScreenNavigationProp } from "../../types";

import { APIAddUser } from "../../api";
import { FormStyles, TabStyles } from "../../styles";

import { validateEmail } from "../../validations";
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

export default function UsersAddScreen({ navigation }: Props) {
    const { state } = useContext(UserContext);
    const formStyles = useStyleSheet(FormStyles);
    const tabStyles = useStyleSheet(TabStyles);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        errors,
        register,
        unregister,
        setValue,
        handleSubmit,
        control,
        clearError,
    } = useForm<formData>({
        defaultValues,
    });

    const onSubmit = (data: formData) => {
        data.isChildren = false;

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
            { name: "firstname" },
            { required: "Firstname is mandatory", min: 8 }
        );
        register(
            { name: "lastname" },
            { required: "Lastname is mandatory", min: 8 }
        );
    }, [register]);
    console.log(errors);
    return (
        <Screen
            mainActionType="back"
            isLoading={false}
            navigation={navigation}
            title="Add a New User"
        >
            <KeyboardAvoidingView>
                <Layout style={formStyles.formContainerInputs} level="1">
                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(text: string) =>
                            setValue("email", text, true)
                        }
                        error={errors.email}
                    />

                    <Input
                        returnKeyType="go"
                        onSubmitEditing={handleSubmit(onSubmit)}
                        onChangeText={(text: string) =>
                            setValue("password", text, true)
                        }
                        placeholder="Password"
                        error={errors.password}
                    />

                    <Input
                        placeholder="Firstname"
                        onChangeText={(text: string) =>
                            setValue("firstname", text, true)
                        }
                        error={errors.firstname}
                    />

                    <Input
                        placeholder="Lastname"
                        onChangeText={(text: string) =>
                            setValue("lastname", text, true)
                        }
                        error={errors.lastname}
                    />
                </Layout>
                <Layout
                    style={[formStyles.formContainerButtons, { flexGrow: 0 }]}
                    level="1"
                >
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
