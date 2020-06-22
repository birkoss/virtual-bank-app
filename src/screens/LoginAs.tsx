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
    LoginAsScreenNavigationProp,
    User,
    TransactionCategory,
} from "../types";
import { UserContext } from "../contexts";
import { UsersIcon } from "../icons";

type Props = {
    navigation: LoginAsScreenNavigationProp;
};

export default function LoginAsScreen({ navigation }: Props) {
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
        <Screen isLoading={isLoading} title="Login As" navigation={navigation}>
            <View style={{ padding: 20 }}>
                <Text style={{ marginBottom: 20 }}>
                    To be able to use Walleteur correctly, you need to complete
                    those steps :
                </Text>

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
