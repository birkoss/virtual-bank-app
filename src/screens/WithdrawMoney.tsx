import React from "react";

import {
    SendMoneyScreenNavigationProp,
    SendMoneyScreenRouteProp,
} from "../types";

import MoneyTransfer from "../components/MoneyTransfer";

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyScreenRouteProp;
};

export default function WithdrawMoneyScreen({ navigation, route }: Props) {
    return (
        <MoneyTransfer
            navigation={navigation}
            route={route}
            type="withdraw"
            button="Withdraw Money"
            title="Withdraw Money"
            userLabel="From"
        />
    );
}
