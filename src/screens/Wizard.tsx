import React, { useContext, useState, useEffect } from "react";
import { View, Alert, AsyncStorage } from "react-native";

import {
    Text,
    Card,
    StyleService,
    useStyleSheet,
    Button,
    Icon,
} from "@ui-kitten/components";

import Screen from "../components/Screen";

import { APIListTransactionsCategories, APIListFamilyMembers } from "../api";
import {
    WizardScreenNavigationProp,
    User,
    TransactionCategory,
} from "../types";
import { UserContext } from "../contexts";
import { UsersIcon } from "../icons";

type Props = {
    navigation: WizardScreenNavigationProp;
};

export default function WizardScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);
    const { state, dispatch } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    const [users, setUsers] = useState<User[]>([]);

    const [categories, setCategories] = useState<TransactionCategory[]>([]);

    const abortController = new AbortController();

    const closeWizard = () => {
        try {
            /* await */ AsyncStorage.setItem("wizard_completed", "1");
        } catch (error) {
            console.log("AsyncStorage.setItem - wizard_completed", error);
        }

        dispatch({
            type: "SHOW_WIZARD",
            payload: {
                status: false,
            },
        });
    };

    const getUsers = () => {
        setIsLoading(true);

        try {
            APIListFamilyMembers(state.token, {
                signal: abortController.signal,
            })
                .then((data) => {
                    let newUsers: User[] = [];
                    data["users"].forEach((user: User) => {
                        newUsers.push(user);
                    });
                    setUsers(newUsers);

                    // Get the transactions categories
                    getCategories();
                })
                .catch((error) => {
                    // Alert.alert(error.message);
                });
        } catch (err) {}
    };

    const getCategories = () => {
        try {
            APIListTransactionsCategories(state.token, {
                signal: abortController.signal,
            })
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
                .catch((error) => {
                    // Alert.alert(error.message);
                });
        } catch (err) {}
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            try {
                setIsLoading(true);
                getUsers();
            } catch (err) {}
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        return function cleanup() {
            try {
                abortController.abort();
            } catch (err) {}
        };
    }, []);

    console.log("Wizard.render()");

    return (
        <Screen
            isLoading={isLoading}
            title="Setup Wizard"
            navigation={navigation}
        >
            <View style={{ padding: 20 }}>
                <Text style={{ marginBottom: 20 }}>
                    To be able to use Walleteur correctly, you need to complete
                    those steps :
                </Text>

                <Card
                    style={styles.cardContainer}
                    header={(props) => (
                        <View {...props}>
                            <Text category="h6">Creating Users</Text>
                        </View>
                    )}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    {users.length === 0 && (
                        <>
                            <Text category="h6" style={styles.paragraph}>
                                You must create users to be able to make
                                transactions.
                            </Text>
                            <Button
                                status="primary"
                                onPress={() => {
                                    navigation.openDrawer();
                                }}
                            >
                                Open the menu
                            </Button>
                        </>
                    )}

                    {users.length > 0 && (
                        <Button
                            status="success"
                            appearance="ghost"
                            size="large"
                            accessoryLeft={(props) => (
                                <Icon
                                    {...props}
                                    width={50}
                                    height={50}
                                    name="checkmark-circle-2-outline"
                                />
                            )}
                        />
                    )}
                </Card>

                <Card
                    style={styles.cardContainer}
                    header={(props) => (
                        <View {...props}>
                            <Text category="h6">
                                <UsersIcon /> Creating Categories
                            </Text>
                        </View>
                    )}
                >
                    {categories.length === 0 && (
                        <>
                            <Text category="h6" style={styles.paragraph}>
                                You must create at least one categories to be
                                able to make transactions.
                            </Text>
                            <Button
                                status="primary"
                                onPress={() => {
                                    navigation.openDrawer();
                                }}
                            >
                                Open the menu
                            </Button>
                        </>
                    )}

                    {categories.length > 0 && (
                        <Button
                            status="success"
                            appearance="ghost"
                            size="large"
                            accessoryLeft={(props) => (
                                <Icon
                                    {...props}
                                    width={50}
                                    height={50}
                                    name="checkmark-circle-2-outline"
                                />
                            )}
                        />
                    )}
                </Card>

                <View>
                    {users.length === 0 && categories.length === 0 && (
                        <Button
                            appearance="ghost"
                            status="basic"
                            onPress={closeWizard}
                        >
                            I know what to do. Skip the wizard!
                        </Button>
                    )}
                    {users.length > 0 && categories.length > 0 && (
                        <Button status="primary" onPress={closeWizard}>
                            Close the Wizard
                        </Button>
                    )}
                </View>
            </View>
        </Screen>
    );
}

const themeStyles = StyleService.create({
    cardContainer: {
        marginBottom: 20,
    },
    paragraph: {
        marginBottom: 20,
    },
});
