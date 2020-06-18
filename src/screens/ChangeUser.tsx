import React from "react";

import { useStyleSheet, Button } from "@ui-kitten/components";

import Screen from "../components/Screen";

import {
    SendMoneyScreenNavigationProp,
    SendMoneyChangeUserScreenRouteProp,
    User,
} from "../types";

import Users from "../components/Users";

import { FormStyles } from "../styles";

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyChangeUserScreenRouteProp;
};

export default function ChangeUserScreen({ navigation, route }: Props) {
    const formStyles = useStyleSheet(FormStyles);

    const chooseUser = (user: User) => {
        return (
            <Button
                disabled={user.accounts[0].id === route.params.accountID}
                size="tiny"
                onPress={() =>
                    navigation.navigate(route.params.screenName as any, {
                        newAccountID: user.accounts[0].id,
                    })
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
            <Users users={route.params.users} action={chooseUser} />
        </Screen>
    );
}
