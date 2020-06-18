import React from "react";

import { List, ListItem } from "@ui-kitten/components";

import { GoalIcon } from "../icons";

import { Goal } from "../types";

type Props = {
    goals: Goal[];
    action: any;
};

export default function Goals({ goals, action }: Props) {
    const renderItem = ({ item }: { item: Goal }) => {
        return (
            <ListItem
                title={item.name}
                description={item.amount + " $"}
                accessoryLeft={GoalIcon}
                accessoryRight={() => action(item)}
            />
        );
    };

    return <List data={goals} renderItem={renderItem} />;
}
