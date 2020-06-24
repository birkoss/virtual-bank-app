import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Alert } from "react-native";

import {
    Text,
    Card,
    StyleService,
    useStyleSheet,
    Button,
} from "@ui-kitten/components";

import { useForm, Controller } from "react-hook-form";

import Input from "../components/Input";
import ButtonLoading from "../components/ButtonLoading";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import Screen from "../components/Screen";

import {
    APIListFamilyMembers,
    APIListTransactionsCategories,
    APISendMoney,
    APIWithdrawMoney,
} from "../api";

import { TransactionsCategoriesIcon, UsersIcon } from "../icons";

import {
    SendMoneyScreenNavigationProp,
    SendMoneyScreenRouteProp,
    User,
    Account,
    TransactionCategory,
} from "../types";

import { UserContext } from "../contexts";
import { validateAmount } from "../validations";
import ListPicker from "./ListPicker";
import Users from "./Users";
import TransactionsCategories from "./TransactionsCategories";
import { useFocusEffect } from "@react-navigation/native";
import { GetUserFullname } from "../helpers";

type formData = {
    accountID: string;
    categoryID: string;
    amount: string;
    description: string;
};

const defaultValues = {
    accountID: "",
    categoryID: "",
    amount: "0",
    description: "",
};

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyScreenRouteProp;
    button: string;
    title: string;
    userLabel: string;
    type: string;
};

export default function MoneyTransfer({
    navigation,
    button,
    title,
    userLabel,
    type,
}: Props) {
    const { state } = useContext(UserContext);
    const styles = useStyleSheet(themeStyles);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        errors,
        register,
        setValue,
        handleSubmit,
        getValues,
        control,
    } = useForm<formData>({
        defaultValues,
    });

    const [users, setUsers] = useState<User[]>([]);

    const [categories, setCategories] = useState<TransactionCategory[]>([]);

    const onCategorySelected = (category: TransactionCategory) => {
        setValue("categoryID", category.id, true);
        setCategories([...categories]);
    };

    const onUserSelected = (user: User) => {
        setValue("accountID", user.accounts[0].id, true);
        setUsers([...users]);
    };

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);

        const apiFunction =
            type === "withdraw" ? APIWithdrawMoney : APISendMoney;

        apiFunction(state.token, {
            category: data["categoryID"],
            account_to: data["accountID"],
            description: data["description"],
            amount: data["amount"],
        })
            .then(onSubmitSuccess)
            .catch((error) => {
                onSubmitFailed(error);
            });
    };

    const onSubmitSuccess = (data: any) => {
        setIsSubmitting(false);
        Alert.alert(
            "Confirmation",
            "Transfer completed with success!",
            [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("Home"),
                },
            ],
            { cancelable: false }
        );
    };

    const onSubmitFailed = (error: any) => {
        setIsSubmitting(false);
        Alert.alert(error.message);
    };

    const getUser = (accountID: string): User | undefined => {
        let user = undefined;

        users.forEach((single_user: User) => {
            if (
                single_user.accounts.filter(
                    (account: Account) => accountID === account.id
                ).length === 1
            ) {
                user = single_user;
            }
        });

        return user;
    };

    const getCategory = (categoryID: string): TransactionCategory => {
        return categories.filter((category) => category.id === categoryID)[0];
    };

    const getUsersFromAPI = () => {
        setIsLoading(true);

        APIListFamilyMembers(state.token)
            .then((data) => {
                let newUsers: User[] = [];
                data["users"].forEach((user: User) => {
                    newUsers.push(user);
                });
                setUsers(newUsers);

                // Get the transactions categories
                getCategoriesFromAPI();
            })
            .catch((error) => Alert.alert(error.message));
    };

    const getCategoriesFromAPI = () => {
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

    const increaseAmount = (amount: number) => {
        let currentAmount: number = parseInt(getValues("amount"));
        if (isNaN(currentAmount)) {
            currentAmount = 0;
        }
        setValue("amount", (currentAmount + amount).toString(), true);
    };

    const currentUser = getUser(getValues("accountID"));
    const currentCategory = getCategory(getValues("categoryID"));

    // Load the users list from the API on each page reload
    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            setIsSubmitting(false);
            getUsersFromAPI();
        }, [])
    );

    // Everytime the users list changed, validate the current Account ID
    useEffect(() => {
        if (getUser(getValues("accountID")) === undefined && users.length > 0) {
            setValue("accountID", users[0].accounts[0].id, true);
        }
    }, [users]);

    // Everytime the categories list changed, validate the current categoryID
    useEffect(() => {
        if (
            getCategory(getValues("categoryID")) === undefined &&
            categories.length > 0
        ) {
            setValue("categoryID", categories[0].id, true);
        }
    }, [categories]);

    // Register the current form fields
    useEffect(() => {
        register(
            { name: "accountID" },
            {
                required: "You need to select an account",
            }
        );
        register(
            { name: "categoryID" },
            {
                required: "You need to select a category",
            }
        );
        register(
            { name: "description" },
            {
                max: 200,
            }
        );
    }, [register]);

    return (
        <Screen isLoading={isLoading} title={title} navigation={navigation}>
            <KeyboardAvoidingView style={styles.container}>
                <ListPicker
                    title={userLabel + ":"}
                    description={
                        currentUser === undefined
                            ? "Nobody"
                            : GetUserFullname(currentUser)
                    }
                    icon={UsersIcon}
                    error={errors.accountID}
                    onItemSelected={onUserSelected}
                    currentItem={currentUser}
                >
                    <Users users={users} action={undefined} />
                </ListPicker>

                <ListPicker
                    title="Category:"
                    description={
                        currentCategory === undefined
                            ? "None"
                            : currentCategory.name
                    }
                    icon={TransactionsCategoriesIcon}
                    error={errors.categoryID}
                    onItemSelected={onCategorySelected}
                    currentItem={currentCategory}
                >
                    <TransactionsCategories
                        categories={categories}
                        action={undefined}
                    />
                </ListPicker>

                <Card
                    style={styles.box}
                    header={(props) => (
                        <View {...props}>
                            <Text category="h6">Amount</Text>
                        </View>
                    )}
                    footer={(props) => (
                        <View {...props} style={styles.inputsContainer}>
                            <Button
                                onPress={() => increaseAmount(1)}
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +1
                            </Button>
                            <Button
                                onPress={() => increaseAmount(2)}
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +2
                            </Button>
                            <Button
                                onPress={() => increaseAmount(5)}
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +5
                            </Button>
                            <Button
                                onPress={() => increaseAmount(10)}
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +10
                            </Button>
                            <Button
                                onPress={() => increaseAmount(20)}
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +20
                            </Button>
                        </View>
                    )}
                >
                    <Controller
                        as={Input}
                        control={control}
                        name="amount"
                        keyboardType="number-pad"
                        onChange={(args) => args[0].nativeEvent.text}
                        defaultValue=""
                        error={errors.amount}
                        rules={{
                            validate: (value) => validateAmount(value) || true,
                        }}
                    />
                </Card>

                <Input
                    style={styles.box}
                    multiline
                    textStyle={{ minHeight: 64 }}
                    onChangeText={(text: string) =>
                        setValue("description", text, true)
                    }
                    placeholder="Description"
                />

                <ButtonLoading
                    isSubmitting={isSubmitting}
                    label={button}
                    style={styles.box}
                    onPress={handleSubmit(onSubmit)}
                />
            </KeyboardAvoidingView>
        </Screen>
    );
}

const themeStyles = StyleService.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    box: {
        marginVertical: 10,
    },
    input: {
        fontSize: 40,
    },
    inputsContainer: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    inputAdjustAmount: {
        margin: 5,
    },
});
