import React from "react";

import { Icon } from "@ui-kitten/components";

export const HomeIcon = (props) => <Icon {...props} name="home-outline" />;

export const TransactionsIcon = (props) => (
    <Icon {...props} name="list-outline" />
);

export const SendMoneyIcon = (props) => (
    <Icon {...props} name="person-remove-outline" />
);

export const ReceiveMoney = (props) => (
    <Icon {...props} name="person-add-outline" />
);
