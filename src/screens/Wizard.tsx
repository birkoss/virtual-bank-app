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

    const closeWizard = () => {
        try {
            /* await */ AsyncStorage.setItem("wizard_completed", "1");
        } catch (error) {
            console.log("AsyncStorage.setItem - wizard_completed", error);
        }

        dispatch({
            type: "WIZARD_COMPLETED",
        });
    };

    const getUsers = () => {
        setIsLoading(true);

        APIListFamilyMembers(state.token)
            .then((data) => {
                let newUsers: User[] = [];
                data["users"].forEach((user: User) => {
                    newUsers.push(user);
                });
                setUsers(newUsers);

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

                setIsLoading(false);
            })
            .catch((error) => Alert.alert(error.message));
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setIsLoading(true);
            getUsers();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Screen isLoading={isLoading} title="Wizard" navigation={navigation}>
            <View style={{ padding: 20 }}>
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
                        <Button appearance="ghost" status="basic">
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
