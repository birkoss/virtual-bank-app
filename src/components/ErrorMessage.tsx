import React from "react";

import { View } from "react-native";

import { FieldError } from "react-hook-form";

import { Icon, Button } from "@ui-kitten/components";

type Props = {
    field: FieldError | undefined;
};

export default function ErrorMessage({ field }: Props) {
    if (field === undefined || field.message === undefined) {
        return null;
    }

    const errorMessage: string = field.message.toString();

    const ErrorIcon = (style: any) => <Icon {...style} name="alert-triangle" />;

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
