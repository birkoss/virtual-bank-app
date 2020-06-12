import React from "react";

import { GestureResponderEvent, TextStyle } from "react-native";

import { Button } from "@ui-kitten/components";

import Loading from "../components/Loading";

type Props = {
    style?: any;
    isSubmitting: boolean;
    onPress: (event: GestureResponderEvent) => void;
    label: string;
};

export default function ButtonLoading({
    style,
    isSubmitting,
    onPress,
    label,
}: Props) {
    if (isSubmitting) {
        return <Button style={style} size="giant" accessoryLeft={Loading} />;
    }
    return (
        <Button style={style} size="giant" onPress={onPress}>
            {label}
        </Button>
    );
}
