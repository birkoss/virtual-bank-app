import React, { useContext, useState } from "react";
import { View, Alert } from "react-native";

import { Text, useStyleSheet, Button } from "@ui-kitten/components";

import Screen from "../components/Screen";

import { APILoginAs, APIListFamilyMembers } from "../api";
import { LoginAsScreenNavigationProp, User } from "../types";
import { UserContext } from "../contexts";
import { useFocusEffect } from "@react-navigation/native";
import Users from "../components/Users";
import { LandingStyles } from "../styles";

type Props = {
    navigation: LoginAsScreenNavigationProp;
};

// @TODO : Bug when a menu item (users, etc..) is open, after logout = navigate screen
export default function LoginAsScreen({ navigation }: Props) {
    const styles = useStyleSheet(LandingStyles);
    const { state, dispatch } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [users, setUsers] = useState<User[]>([]);

    const loginSameUser = () => {
        dispatch({
            type: "LOGIN_AS",
            payload: {
                loginAs: false,
            },
        });
    };

    const loginNewUser = (userID: string) => {
        setIsSubmitting(true);

        APILoginAs(state.token, userID)
            .then(onSubmitSuccess)
            .catch((error) => {
                onSubmitFailed(error);
            });
    };

    const onSubmitSuccess = (data: any) => {
        setIsSubmitting(false);

        dispatch({
            type: "LOGIN",
            payload: {
                token: data["token"],
            },
        });

        dispatch({
            type: "LOGIN_AS",
            payload: {
                loginAs: false,
            },
        });
    };

    const onSubmitFailed = (error: any) => {
        setIsSubmitting(false);
        Alert.alert(error.message);
    };

    const getUsers = () => {
        setIsLoading(true);
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
            setIsLoading(true);
            getUsers();
        }, [])
    );

    const pickUser = (user: User) => {
        return (
            <Button
                size="tiny"
                disabled={isSubmitting}
                onPress={() => loginNewUser(user.id)}
            >
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
                    onPress={loginSameUser}
                >
                    {primaryButtonLabel}
                </Button>
            </View>
        </Screen>
    );
}
