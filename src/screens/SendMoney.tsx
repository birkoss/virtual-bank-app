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

export default function SendMoneyScreen({ navigation, route }: Props) {
    return (
        <MoneyTransfer
            navigation={navigation}
            route={route}
            type="send"
            button="Send Money"
            title="Send Money"
            userLabel="To"
        />
    );
}
