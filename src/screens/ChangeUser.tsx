import React from "react";

import { useStyleSheet, Layout, Button } from "@ui-kitten/components";

import Screen from "../components/Screen";

import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";

import {
    SendMoneyScreenNavigationProp,
    SendMoneyChangeUserScreenRouteProp,
} from "../types";

import Users from "../components/Users";

import { FormStyles } from "../styles";

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyChangeUserScreenRouteProp;
};

export default function ChangeUserScreen({ navigation, route }: Props) {
    const formStyles = useStyleSheet(FormStyles);

    const chooseUser = (userID: string) => {
        return (
            <Button
                size="tiny"
                onPress={() =>
                    navigation.navigate("SendMoney", { newUserID: userID })
                }
            >
                SELECT
            </Button>
        );
    };

    return (
        <Screen
            mainActionType="back"
            isLoading={false}
            navigation={navigation}
            title="Change User"
        >
            <Users users={route.params.users} actions={chooseUser} />
        </Screen>
    );
}
