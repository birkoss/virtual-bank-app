import React from "react";

import { List, ListItem } from "@ui-kitten/components";

import { UsersIcon, AdultIcon } from "../icons";

import { User } from "../types";
import { GetUserFullname } from "../helpers";

type Props = {
    users: User[];
    action: any;
};

export default function Users({ users, action }: Props) {
    const renderItem = ({ item }: { item: User }) => {
        let description: string = item.is_children ? "" : item.email;
        if (item.accounts[0].balance !== undefined) {
            description += "\nBalance: " + item.accounts[0].balance + " $";
        }

        return (
            <ListItem
                title={GetUserFullname(item)}
                description={description.trim()}
                accessoryLeft={item.is_children ? UsersIcon : AdultIcon}
                accessoryRight={() => action(item)}
            />
        );
    };

    return <List data={users} renderItem={renderItem} />;
}
