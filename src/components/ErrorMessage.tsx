import React from "react";

import { View } from "react-native";

import { Icon, Button } from "@ui-kitten/components";

type Props = {
    errors: Object;
    name: string;
};

export default function ErrorMessage({ errors, name }: Props) {
    if (name === undefined) {
        return null;
    }

    if (errors[name] === undefined) {
        return null;
    }

    const errorMessage = errors[name]["message"];

    const ErrorIcon = (style) => <Icon {...style} name="alert-triangle" />;

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Button
                appearance="ghost"
                status="danger"
                size="small"
                accessoryLeft={ErrorIcon}
            >
                {errorMessage}
            </Button>
        </View>
    );
}
