import React, { useState, useEffect, useContext } from "react";

import { Button, TopNavigationAction } from "@ui-kitten/components";

import Screen from "../../components/Screen";

import { AddIcon } from "../../icons";
import { APIListUsers, APIDeleteUser } from "../../api";

import { UsersScreenNavigationProp, User } from "../../types";
import { Alert } from "react-native";
import { UserContext } from "../../contexts";
import EmptyList from "../../components/EmptyList";

import Users from "../../components/Users";

type Props = {
    navigation: UsersScreenNavigationProp;
};

export default function UsersListScreen({ navigation }: Props) {
    const { state } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // @TODO : Delete in RED (and same wording as when we delete an app)
    // @TODO : Prevent deletion of the current user
    const askConfirmation = (userID: string) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this user?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () =>
                        APIDeleteUser(state.token, userID)
                            .then(() => getList())
                            .catch((error) => Alert.alert(error)),
                },
            ],
            { cancelable: false }
        );
    };

    const addUser = () => {
        navigation.push("Add");
    };

    const deleteUser = (user: User) => (
        <Button size="tiny" onPress={() => askConfirmation(user.id)}>
            DELETE
        </Button>
    );

    const getList = () => {
        setIsLoading(true);
        APIListUsers(state.token)
            .then((data) => {
                let newUsers: User[] = [];
                data["users"].forEach((user: User) => {
                    newUsers.push(user);
                });
                setUsers(newUsers);
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
            title="Users"
            secondaryAction={() => (
                <TopNavigationAction onPress={() => addUser()} icon={AddIcon} />
            )}
        >
            {users.length === 0 && (
                <EmptyList
                    text="No users"
                    buttonText="Add a new user"
                    buttonAction={() => addUser()}
                />
            )}

            {users.length !== 0 && <Users users={users} action={deleteUser} />}
        </Screen>
    );
}
