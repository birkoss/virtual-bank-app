import React from "react";

import { Input as KittenInput, useStyleSheet } from "@ui-kitten/components";

import ErrorMessage from "./ErrorMessage";

import { FormStyles } from "../styles";

export default function Input(props: any) {
    const formStyles = useStyleSheet(FormStyles);

    return (
        <>
            <KittenInput
                autoCapitalize="none"
                autoCorrect={false}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                style={formStyles.input}
                {...props}
            />
            {props.error !== undefined && <ErrorMessage field={props.error} />}
        </>
    );
}
