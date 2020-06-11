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
