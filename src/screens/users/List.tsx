import React, { useState, useEffect, useContext } from "react";

import {
    Button,
    TopNavigationAction,
    Modal,
    Card,
    Text,
    useStyleSheet,
} from "@ui-kitten/components";

import Screen from "../../components/Screen";

import { AddIcon } from "../../icons";
import { APIListUsers, APIDeleteUser } from "../../api";

import { UsersScreenNavigationProp, User } from "../../types";
import { Alert } from "react-native";
import { UserContext } from "../../contexts";
import EmptyList from "../../components/EmptyList";

import Users from "../../components/Users";
import { ModalStyles } from "../../styles";

type Props = {
    navigation: UsersScreenNavigationProp;
};

export default function UsersListScreen({ navigation }: Props) {
    const { state } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [addUserModalVisible, setAddUserModalVisible] = useState(false);

    const modalStyles = useStyleSheet(ModalStyles);

    const askConfirmation = (user: User) => {
        Alert.alert(
            "Confirmation",
            'Deleting  "' +
                user.firstname +
                " " +
                user.lastname +
                '" will also delete all of its data.',
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () =>
                        APIDeleteUser(state.token, user.id)
                            .then(() => getList())
                            .catch((error) => Alert.alert(error.message)),
                },
            ],
            { cancelable: false }
        );
    };

    const addUser = () => {
        setAddUserModalVisible(false);
        navigation.push("Add");
    };

    const addChildren = () => {
        setAddUserModalVisible(false);
        navigation.push("AddChildren");
    };

    const deleteUser = (user: User) => (
        <Button size="tiny" onPress={() => askConfirmation(user)}>
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
            .catch((error) => console.log(error));
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
                <TopNavigationAction
                    onPress={() => setAddUserModalVisible(true)}
                    icon={AddIcon}
                />
            )}
        >
            <Modal
                visible={addUserModalVisible}
                backdropStyle={modalStyles.backdrop}
                onBackdropPress={() => setAddUserModalVisible(false)}
            >
                <Card disabled={true}>
                    <Text category="h5">
                        What kind of account do you want to create ?
                    </Text>
                    <Text category="h6" style={{ marginTop: 30 }}>
                        Children Account
                    </Text>

                    <Text style={{ marginTop: 10 }}>
                        A children account is a managed account. They can see
                        their balance, manage goals and send money.
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                        No real information is needed, only an alias to identify
                        the owner. It could be the firstname or a nickname.
                    </Text>

                    <Text style={{ marginTop: 10 }}>
                        Children will need to log in their account using a
                        generated code.
                    </Text>

                    <Button
                        style={{ marginTop: 10 }}
                        onPress={() => addChildren()}
                    >
                        Create a Children Account
                    </Button>

                    <Text category="h6" style={{ marginTop: 30 }}>
                        Normal Account
                    </Text>

                    <Text style={{ marginTop: 10 }}>
                        A normal account a an unmanaged account for Parents.
                        They can manage family members, manage transactions
                        categories and also withdraw amounts over the target
                        balance limit.
                    </Text>

                    <Button style={{ marginTop: 10 }} onPress={() => addUser()}>
                        Create a Normal Account
                    </Button>

                    <Button
                        style={{ marginTop: 10 }}
                        appearance="ghost"
                        onPress={() => setAddUserModalVisible(false)}
                    >
                        Nevermind, I changed my mind!
                    </Button>
                </Card>
            </Modal>

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
