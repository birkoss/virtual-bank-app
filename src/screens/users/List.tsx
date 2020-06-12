import React, { useState, useEffect, useContext } from "react";

import {
    StyleService,
    useStyleSheet,
    ListItem,
    List,
    Icon,
    Button,
    TopNavigationAction,
} from "@ui-kitten/components";

import Screen from "../../components/Screen";

import { UserAddIcon, UsersIcon } from "../../icons";
import { APIListUsers } from "../../api";

import { UsersScreenNavigationProp, User } from "../../types";
import { Alert } from "react-native";
import { UserContext } from "../../contexts";

type Props = {
    navigation: UsersScreenNavigationProp;
};

export const renderItemAction = (props: any) => (
    <Button size="tiny">DELETE</Button>
);

export default function UsersListScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);
    const { state } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const renderItem = ({ item }: { item: User }) => (
        <ListItem
            title={`${item.firstname} ${item.lastname}`}
            description={item.email}
            accessoryLeft={UsersIcon}
            accessoryRight={renderItemAction}
        />
    );

    const getList = () => {
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
                <TopNavigationAction
                    onPress={() => navigation.push("Add")}
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
