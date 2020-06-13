import React from "react";

import { useStyleSheet, Button } from "@ui-kitten/components";

import Screen from "../components/Screen";

import {
    SendMoneyScreenNavigationProp,
    SendMoneyChangeCategoryScreenRouteProp,
} from "../types";

import TransactionsCategories from "../components/TransactionsCategories";

import { FormStyles } from "../styles";

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyChangeCategoryScreenRouteProp;
};

export default function ChangeCategoryScreen({ navigation, route }: Props) {
    const formStyles = useStyleSheet(FormStyles);

    const chooseCategory = (categoryID: string) => {
        return (
            <Button
                size="tiny"
                onPress={() =>
                    navigation.navigate("SendMoney", {
                        newCategoryID: categoryID,
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
            title="Change Category"
        >
            <TransactionsCategories
                categories={route.params.categories}
                action={chooseCategory}
            />
        </Screen>
    );
}
