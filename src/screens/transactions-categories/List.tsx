import React, { useState, useEffect, useContext } from "react";

import { Button, TopNavigationAction } from "@ui-kitten/components";

import Screen from "../../components/Screen";

import { AddIcon } from "../../icons";
import {
    APIListTransactionsCategories,
    APIDeleteTransactionsCategories,
} from "../../api";

import {
    TransactionsCategoriesScreenNavigationProp,
    TransactionCategory,
} from "../../types";
import { Alert } from "react-native";
import { UserContext } from "../../contexts";
import EmptyList from "../../components/EmptyList";

import TransactionsCategories from "../../components/TransactionsCategories";

type Props = {
    navigation: TransactionsCategoriesScreenNavigationProp;
};

export default function TransactionsCategoriesListScreen({
    navigation,
}: Props) {
    const { state } = useContext(UserContext);
    const [categories, setCategories] = useState<TransactionCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const askConfirmation = (category: TransactionCategory) => {
        Alert.alert(
            "Confirmation",
            'Deleting  "' +
                category.name +
                '" will also delete all of its data.',
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () =>
                        APIDeleteTransactionsCategories(
                            state.token,
                            category.id
                        )
                            .then(() => getList())
                            .catch((error) => Alert.alert(error)),
                },
            ],
            { cancelable: false }
        );
    };

    const addCategory = () => {
        navigation.push("Add");
    };

    const deleteCategory = (category: TransactionCategory) => {
        if (category.transactions !== 0) {
            return null;
        }

        return (
            <Button size="tiny" onPress={() => askConfirmation(category)}>
                DELETE
            </Button>
        );
    };

    const getList = () => {
        setIsLoading(true);
        APIListTransactionsCategories(state.token)
            .then((data) => {
                let newCategories: TransactionCategory[] = [];
                data["transactionsCategories"].forEach(
                    (category: TransactionCategory) => {
                        newCategories.push(category);
                    }
                );
                setCategories(newCategories);
                setIsLoading(false);
            })
            .catch((error) => Alert.alert(error.message));
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setIsLoading(true);
            getList();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Screen
            isLoading={isLoading}
            navigation={navigation}
            title="Transactions Categories"
            secondaryAction={() => (
                <TopNavigationAction
                    onPress={() => addCategory()}
                    icon={AddIcon}
                />
            )}
        >
            {categories.length === 0 && (
                <EmptyList
                    text="No categories"
                    buttonText="Add a new categories"
                    buttonAction={() => addCategory()}
                />
            )}

            {categories.length !== 0 && (
                <TransactionsCategories
                    categories={categories}
                    action={deleteCategory}
                />
            )}
        </Screen>
    );
}
