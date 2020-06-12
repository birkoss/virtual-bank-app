import React, { useState, useEffect, useContext } from "react";

import { useForm, Controller } from "react-hook-form";

import {
    StyleService,
    useStyleSheet,
    Layout,
    CheckBox,
    Text,
} from "@ui-kitten/components";

import Screen from "../../components/Screen";
import Input from "../../components/Input";

import ButtonLoading from "../../components/ButtonLoading";
import { KeyboardAvoidingView } from "../../components/KeyboardAvoidingView";

import { UsersScreenNavigationProp } from "../../types";

import { APIAddUser } from "../../api";
import { FormStyles } from "../../styles";

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
    const styles = useStyleSheet(themeStyles);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, register, setValue, handleSubmit, control } = useForm<
        formData
    >({
        defaultValues,
    });

    const onSubmit = (data: formData) => {
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

        console.log(data);
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

                    <Controller
                        style={formStyles.checkbox}
                        as={<CheckBox />}
                        name="isChildren"
                        control={control}
                        defaultValue={false}
                    >
                        Children Account
                    </Controller>

                    <Layout level="2" style={formStyles.explication}>
                        <Text>
                            A children account a limited. It cannot create users
                            or manage friends.
                        </Text>
                    </Layout>
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

const themeStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: "yellow",
        borderColor: "red",
        borderWith: 10,
        color: "color-success-default",
    },
});
