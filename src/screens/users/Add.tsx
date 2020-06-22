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
        Alert.alert("OK");
        return;

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
        if (selectedIndex === 0) {
            //unregister(["firstname", "email", "password", "lastname"]);
            register(
                { name: "firstname" },
                { required: "Alias is mandatory", min: 8 }
            );
        } else {
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
        }

        // clearError();
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
                <TabView
                    selectedIndex={selectedIndex}
                    onSelect={(index) => setSelectedIndex(index)}
                    style={tabStyles.container}
                >
                    <Tab style={tabStyles.tab} title="Children Account">
                        <>
                            <Layout
                                style={formStyles.formContainerInputs}
                                level="1"
                            >
                                <Layout
                                    level="2"
                                    style={formStyles.explication}
                                >
                                    <Text>
                                        A children account a an managed account.
                                        It see his balance, manage its goals and
                                        send money.
                                    </Text>
                                    <Text style={{ marginTop: 10 }}>
                                        No real information is needed, only an
                                        alias to identify the account. It could
                                        be the firstname or a nickname. Children
                                        will need to log in their account using
                                        a generated code.
                                    </Text>
                                </Layout>

                                <Input
                                    placeholder="Alias"
                                    onChangeText={(text: string) =>
                                        setValue("firstname", text, true)
                                    }
                                    error={errors.firstname}
                                />
                            </Layout>
                            <Layout
                                style={[
                                    formStyles.formContainerButtons,
                                    { flexGrow: 0 },
                                ]}
                                level="1"
                            >
                                <ButtonLoading
                                    isSubmitting={isSubmitting}
                                    onPress={handleSubmit(onSubmit)}
                                    label="CREATE"
                                />
                            </Layout>
                        </>
                    </Tab>
                    <Tab style={tabStyles.tab} title="Normal Account">
                        <>
                            <Layout
                                style={formStyles.formContainerInputs}
                                level="1"
                            >
                                <Layout
                                    level="2"
                                    style={formStyles.explication}
                                >
                                    <Text>
                                        A normal account a an unmanaged account
                                        for Parents. It can manage family
                                        members, categories and also withdraw
                                        amounts over the limit.
                                    </Text>
                                </Layout>

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
                                style={[
                                    formStyles.formContainerButtons,
                                    { flexGrow: 0 },
                                ]}
                                level="1"
                            >
                                <ButtonLoading
                                    isSubmitting={isSubmitting}
                                    onPress={handleSubmit(onSubmit)}
                                    label="CREATE"
                                />
                            </Layout>
                        </>
                    </Tab>
                </TabView>
            </KeyboardAvoidingView>
        </Screen>
    );
}
