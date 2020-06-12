import React from "react";

import {
    StyleService,
    useStyleSheet,
    ListItem,
    List,
    Icon,
    TopNavigationAction,
} from "@ui-kitten/components";

import Screen from "../../components/Screen";

import { UserAddIcon } from "../../icons";

import { UsersScreenNavigationProp } from "../../types";

type Props = {
    navigation: UsersScreenNavigationProp;
};

export const renderItemIconNavigation = (props: any) => (
    <Icon {...props} name="person-outline" />
);

export default function UsersListScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);

    const renderItemIcon = (props: any) => (
        <Icon {...props} name="person-outline" />
    );

    const transactionsData = new Array(8).fill({
        title: "Title for Item",
        description: "Description for Item",
    });

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={renderItemIconNavigation}
        />
    );

    return (
        <Screen
            isLoading={false}
            navigation={navigation}
            title="Users"
            secondaryAction={() => (
                <TopNavigationAction
                    onPress={() => navigation.push("Add")}
                    icon={UserAddIcon}
                />
            )}
        >
            <List
                data={transactionsData}
                style={styles.list}
                renderItem={renderItem}
            />
        </Screen>
    );
}

const themeStyles = StyleService.create({
    list: {},
});
