import React from "react";

import { Icon } from "@ui-kitten/components";

export const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;

export const TransactionsIcon = (props: any) => (
    <Icon {...props} name="list-outline" />
);

export const SendMoneyIcon = (props: any) => (
    <Icon {...props} name="person-remove-outline" />
);

export const ReceiveMoney = (props: any) => (
    <Icon {...props} name="person-add-outline" />
);

export const UsersIcon = (props: any) => (
    <Icon {...props} name="person-outline" />
);

export const UserAddIcon = (props: any) => (
    <Icon {...props} name="person-add-outline" />
);

export const ForwardIcon = (props: any) => {
    return <Icon {...props} name="arrow-ios-forward" />;
};

export const MenuIcon = (props: any) => <Icon {...props} name="menu-outline" />;

export const BackIcon = (props: any) => (
    <Icon {...props} name="arrow-ios-back-outline" />
);
