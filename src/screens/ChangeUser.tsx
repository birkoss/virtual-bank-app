import React from "react";

import { useStyleSheet, Layout, Button } from "@ui-kitten/components";

import Screen from "../components/Screen";

import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";

import {
    SendMoneyScreenNavigationProp,
    SendMoneyChangeUserScreenRouteProp,
} from "../types";

import { FormStyles } from "../styles";

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyChangeUserScreenRouteProp;
};

export default function ChangeUserScreen({ navigation, route }: Props) {
    const formStyles = useStyleSheet(FormStyles);
    console.log(route.params);
    return (
        <Screen
            mainActionType="back"
            isLoading={false}
            navigation={navigation}
            title="Change User"
        >
            <KeyboardAvoidingView>
                <Layout style={formStyles.formContainerButtons} level="1">
                    <Button
                        onPress={() => {
                            navigation.navigate("SendMoney", {
                                newUserID: "NEW USER ICITTE",
                            });
                        }}
                    >
                        {route.params.userID}
                    </Button>
                </Layout>
            </KeyboardAvoidingView>
        </Screen>
    );
}
