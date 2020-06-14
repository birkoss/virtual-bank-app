import React, { useState, useEffect, useContext } from "react";
import { View, Alert } from "react-native";

import {
    Text,
    Card,
    StyleService,
    useStyleSheet,
    ListItem,
    Button,
    Layout,
} from "@ui-kitten/components";

import { useForm, Controller } from "react-hook-form";

import Input from "../components/Input";
import ButtonLoading from "../components/ButtonLoading";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import Screen from "../components/Screen";

import {
    APIListUsers,
    APIListTransactionsCategories,
    APIAddTransactions,
} from "../api";

import { TransactionsCategoriesIcon, UsersIcon } from "../icons";

import {
    SendMoneyScreenNavigationProp,
    SendMoneyScreenRouteProp,
    User,
    TransactionCategory,
} from "../types";

import { UserContext } from "../contexts";
import { validateAmount } from "../validations";
import ErrorMessage from "../components/ErrorMessage";

type formData = {
    userID: string;
    categoryID: string;
    amount: string;
    description: string;
};

const defaultValues = {
    userID: "",
    categoryID: "",
    amount: "0",
    description: "",
};

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyScreenRouteProp;
};

export default function SendMoneyScreen({ navigation, route }: Props) {
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
        formState,
    } = useForm<formData>({
        defaultValues,
    });

    const [users, setUsers] = useState<User[]>([]);

    const [categories, setCategories] = useState<TransactionCategory[]>([]);

    const changeCategory = () => {
        return (
            <Button
                disabled={categories.length === 0 ? true : false}
                size="tiny"
                onPress={() =>
                    navigation.push("ChangeCategory", {
                        categoryID: getValues("categoryID"),
                        categories,
                    })
                }
            >
                CHANGE
            </Button>
        );
    };

    const changeUser = () => {
        return (
            <Button
                size="tiny"
                disabled={users.length === 0 ? true : false}
                onPress={() =>
                    navigation.push("ChangeUser", {
                        userID: getValues("userID"),
                        users,
                    })
                }
            >
                CHANGE
            </Button>
        );
    };

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);

        console.log("YES", data);

        APIAddTransactions(state.token, {
            category: data["categoryID"],
            // account_to: data["userID"],
            account_to: "4821e8e0-f11e-4abf-b13c-ac075d5df410",
            description: data["description"],
            amount: data["amount"],
        })
            .then(onSubmitSuccess)
            .catch((error) => {
                onSubmitFailed(error);
            });
    };

    const onSubmitSuccess = (data: any) => {
        Alert.alert("YES SIR");
        setIsSubmitting(false);
    };

    const onSubmitFailed = (error: any) => {
        setIsSubmitting(false);
        Alert.alert(error.message);
    };

    // Load the new userID or categoryID from the Change Screen
    useEffect(() => {
        if (route.params?.newUserID) {
            setValue("userID", route.params.newUserID, true);
        }
        if (route.params?.newCategoryID) {
            setValue("categoryID", route.params.newCategoryID, true);
        }
    }, [route.params?.newUserID, route.params?.newCategoryID]);

    useEffect(() => {
        register(
            { name: "userID" },
            {
                required: "You need to select an user",
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

    const getUser = (userID: string): User => {
        return users.filter((user) => user.id === userID)[0];
    };

    const getCategory = (categoryID: string): TransactionCategory => {
        return categories.filter((category) => category.id === categoryID)[0];
    };

    const getUsers = () => {
        setIsLoading(true);
        APIListUsers(state.token)
            .then((data) => {
                let newUsers: User[] = [];
                data["users"].forEach((user: User) => {
                    newUsers.push(user);
                });
                setUsers(newUsers);

                // Select the first userID
                if (
                    newUsers.length > 0 &&
                    newUsers.filter((user) => getValues("userID") === user.id)
                        .length === 0
                ) {
                    setValue("userID", newUsers[0].id, true);
                }

                // Get the transactions categories
                getCategories();
            })
            .catch((error) => Alert.alert(error.message));
    };

    const getCategories = () => {
        APIListTransactionsCategories(state.token)
            .then((data) => {
                let newCategories: TransactionCategory[] = [];
                data["transactionsCategories"].forEach(
                    (category: TransactionCategory) => {
                        newCategories.push(category);
                    }
                );
                setCategories(newCategories);

                // Select the first categoryID
                if (
                    newCategories.length > 0 &&
                    newCategories.filter(
                        (category) => getValues("categoryID") === category.id
                    ).length === 0
                ) {
                    setValue("categoryID", newCategories[0].id, true);
                }

                setIsLoading(false);
            })
            .catch((error) => Alert.alert(error.message));
    };

    // Load the users list from the API on each page reload
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setIsLoading(true);
            setIsSubmitting(false);
            getUsers();
        });
        return unsubscribe;
    }, [navigation]);

    const increaseAmount = (amount: number) => {
        const currentAmount: number = parseInt(getValues("amount"));
        setValue("amount", (currentAmount + amount).toString(), true);
    };

    const currentUser = getUser(getValues("userID"));
    const currentCategory = getCategory(getValues("categoryID"));

    return (
        <Screen
            isLoading={isLoading}
            title="Send Money"
            navigation={navigation}
        >
            <KeyboardAvoidingView style={styles.container}>
                <Layout style={styles.box}>
                    <ListItem
                        title="To:"
                        description={
                            currentUser === undefined
                                ? "Nobody"
                                : currentUser.firstname +
                                  " " +
                                  currentUser.lastname
                        }
                        accessoryLeft={UsersIcon}
                        accessoryRight={changeUser}
                    />
                    <ErrorMessage field={errors.userID} />
                </Layout>

                <Layout style={styles.box}>
                    <ListItem
                        title="Category:"
                        description={
                            currentCategory === undefined
                                ? "None"
                                : currentCategory.name
                        }
                        accessoryLeft={TransactionsCategoriesIcon}
                        accessoryRight={changeCategory}
                    />
                    <ErrorMessage field={errors.categoryID} />
                </Layout>

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
                    label="Send Money"
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
