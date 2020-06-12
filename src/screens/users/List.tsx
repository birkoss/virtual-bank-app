import React, { useState, useEffect, useContext } from "react";

import {
    StyleService,
    useStyleSheet,
    ListItem,
    List,
    Button,
    TopNavigationAction,
} from "@ui-kitten/components";

import Screen from "../../components/Screen";

import { UserAddIcon, UsersIcon } from "../../icons";
import { APIListUsers, APIDeleteUser } from "../../api";

import { UsersScreenNavigationProp, User } from "../../types";
import { Alert } from "react-native";
import { UserContext } from "../../contexts";
import EmptyList from "../../components/EmptyList";

type Props = {
    navigation: UsersScreenNavigationProp;
};

export default function UsersListScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);
    const { state } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const askConfirmation = (userID: string) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this user?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "Yes", onPress: () => deleteUser(userID) },
            ],
            { cancelable: false }
        );
    };

    const addUser = () => {
        navigation.push("Add");
    };

    const deleteUser = (userID: string) => {
        APIDeleteUser(state.token, userID)
            .then(() => getList())
            .catch((error) => Alert.alert(error));
    };

    const renderItem = ({ item }: { item: User }) => {
        return (
            <ListItem
                title={`${item.firstname} ${item.lastname}`}
                description={item.email}
                accessoryLeft={UsersIcon}
                accessoryRight={() => (
                    <Button
                        size="tiny"
                        onPress={() => askConfirmation(item.id)}
                    >
                        DELETE
                    </Button>
                )}
            />
        );
    };

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

    if (users.length === 0) {
        return (
            <EmptyList
                text="No users"
                buttonText="Add a new user"
                buttonAction={() => addUser()}
            />
        );
    }

    return (
        <Screen
            isLoading={isLoading}
            navigation={navigation}
            title="Users"
            secondaryAction={() => (
                <TopNavigationAction
                    onPress={() => addUser()}
                    icon={UserAddIcon}
                />
            )}
        >
            <List data={users} style={styles.list} renderItem={renderItem} />
        </Screen>
    );
}

const themeStyles = StyleService.create({
    list: {},
});
