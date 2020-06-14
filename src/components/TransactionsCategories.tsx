import React from "react";

import { List, ListItem } from "@ui-kitten/components";

import { TransactionsCategoriesIcon } from "../icons";

import { TransactionCategory } from "../types";

type Props = {
    categories: TransactionCategory[];
    action: any;
};

export default function TransactionsCategories({ categories, action }: Props) {
    const renderItem = ({ item }: { item: TransactionCategory }) => {
        return (
            <ListItem
                title={item.name}
                description={item.transactions + " transaction(s)"}
                accessoryLeft={TransactionsCategoriesIcon}
                accessoryRight={() =>
                    item.transactions === 0 ? action(item) : null
                }
            />
        );
    };

    return <List data={categories} renderItem={renderItem} />;
}
