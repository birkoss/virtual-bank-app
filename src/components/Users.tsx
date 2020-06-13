import React from "react";

import { List, ListItem } from "@ui-kitten/components";

import { UsersIcon, AdultIcon } from "../icons";

import { User } from "../types";
import { RenderProp } from "@ui-kitten/components/devsupport";
import { ViewProps } from "react-native";

type Props = {
    users: User[];
    action: any;
};

export default function Users({ users, action }: Props) {
    const renderItem = ({ item }: { item: User }) => {
        return (
            <ListItem
                title={`${item.firstname} ${item.lastname}`}
                description={item.email}
                accessoryLeft={item.is_children ? UsersIcon : AdultIcon}
                accessoryRight={() => action(item.id)}
            />
        );
    };

    return <List data={users} renderItem={renderItem} />;
}
