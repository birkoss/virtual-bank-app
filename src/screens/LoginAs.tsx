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
import { useFocusEffect } from "@react-navigation/native";
import Users from "../components/Users";
import { LandingStyles } from "../styles";

type Props = {
    navigation: LoginAsScreenNavigationProp;
};

export default function LoginAsScreen({ navigation }: Props) {
    const styles = useStyleSheet(LandingStyles);
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
        console.log("GET USERS");
        APIListFamilyMembers(state.token)
            .then((data) => {
                let newUsers: User[] = [];
                data["users"].forEach((user: User) => {
                    if (user.is_children) {
                        newUsers.push(user);
                    }
                });
                setUsers(newUsers);

                setIsLoading(false);
            })
            .catch((error) => Alert.alert(error.message));
    };

    useFocusEffect(
        React.useCallback(() => {
            console.log("LoginAs useCallback...");
            setIsLoading(true);
            getUsers();
        }, [])
    );

    const pickUser = (user: User) => {
        return (
            <Button size="tiny" onPress={() => console.log("...")}>
                LOGIN
            </Button>
        );
    };

    const primaryButtonLabel: string =
        "Continue as " +
        state.account?.firstname +
        " " +
        state.account?.lastname;

    return (
        <Screen
            isLoading={isLoading}
            title="Login As"
            navigation={navigation}
            mainActionType="none"
        >
            <View style={{ padding: 20 }}>
                <Text style={{ textAlign: "center", marginBottom: 20 }}>
                    Pick a Children Accont to use on this device
                </Text>
                <Users users={users} action={pickUser} />
                <Text style={{ textAlign: "center", marginTop: 20 }}>or</Text>
            </View>
            <View>
                <Button
                    style={styles.primaryActionButton}
                    onPress={() => console.log("aa")}
                >
                    {primaryButtonLabel}
                </Button>
            </View>
        </Screen>
    );
}
