import React, { useState, useEffect, useContext } from "react";
import { View, Alert } from "react-native";

import {
    Text,
    Card,
    StyleService,
    useStyleSheet,
    ListItem,
    Icon,
    Button,
} from "@ui-kitten/components";

import Input from "../components/Input";
import ButtonLoading from "../components/ButtonLoading";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import Screen from "../components/Screen";

import { APIListUsers } from "../api";

import { User } from "../types";

import { TransactionsCategoriesIcon, UsersIcon } from "../icons";

import {
    SendMoneyScreenNavigationProp,
    SendMoneyScreenRouteProp,
} from "../types";
import { UserContext } from "../contexts";

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyScreenRouteProp;
};

export default function SendMoneyScreen({ navigation, route }: Props) {
    const { state } = useContext(UserContext);
    const styles = useStyleSheet(themeStyles);
    const [isLoading, setIsLoading] = useState(true);
    const [userID, setUserID] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    const changeUser = () => {
        return (
            <Button
                size="tiny"
                onPress={() =>
                    navigation.push("ChangeUser", {
                        userID,
                        users,
                    })
                }
            >
                CHANGE
            </Button>
        );
    };

    // Load the new userID from the ChangeUser screen
    useEffect(() => {
        if (route.params?.newUserID) {
            setUserID(route.params.newUserID);
        }
    }, [route.params?.newUserID]);

    const getUser = (userID: string): User => {
        return users.filter((user) => user.id === userID)[0];
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

                // Validate that the current userID is valid
                if (
                    newUsers.length > 0 &&
                    newUsers.filter((user) => userID === user.id).length === 0
                ) {
                    setUserID(newUsers[0].id);
                }

                setIsLoading(false);
            })
            .catch((error) => Alert.alert(error.message));
    };

    // Load the users list from the API on each page reload
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setIsLoading(true);
            getUsers();
        });
        return unsubscribe;
    }, [navigation]);

    const currentUser = getUser(userID);

    return (
        <Screen
            isLoading={isLoading}
            title="Send Money"
            navigation={navigation}
        >
            <KeyboardAvoidingView style={styles.container}>
                <ListItem
                    style={styles.box}
                    title="To:"
                    description={
                        currentUser === undefined
                            ? "nobody..."
                            : currentUser.firstname + " " + currentUser.lastname
                    }
                    accessoryLeft={UsersIcon}
                    accessoryRight={changeUser}
                />

                <ListItem
                    style={styles.box}
                    title="Category:"
                    description="Rewards"
                    accessoryLeft={TransactionsCategoriesIcon}
                    accessoryRight={() => <Button size="tiny">CHANGE</Button>}
                />

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
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +1
                            </Button>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +2
                            </Button>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +5
                            </Button>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +10
                            </Button>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +20
                            </Button>
                        </View>
                    )}
                >
                    <Input
                        returnKeyType="go"
                        style={styles.input}
                        keyboardType="number-pad"
                        placeholder="Amount"
                    />
                </Card>

                <ButtonLoading label="Send Money" style={styles.box} />
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
