import React from "react";

import { List, ListItem } from "@ui-kitten/components";

import { UsersIcon, AdultIcon } from "../icons";

import { User } from "../types";

type Props = {
    users: User[];
    action: any;
};

export default function Users({ users, action }: Props) {
    const renderItem = ({ item }: { item: User }) => {
        let description: string = item.email;
        if (item.accounts[0].balance !== undefined) {
            description += "\nBalance: " + item.accounts[0].balance + " $";
        }

        return (
            <ListItem
                title={`${item.firstname} ${item.lastname}`}
                description={description}
                accessoryLeft={item.is_children ? UsersIcon : AdultIcon}
                accessoryRight={() => action(item)}
            />
        );
    };

    return <List data={users} renderItem={renderItem} />;
}
