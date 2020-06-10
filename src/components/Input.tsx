import React, { useRef } from "react";

import { Input as KittenInput } from "@ui-kitten/components";

export default function Input(props: any) {
    const inputRef = useRef();
    return (
        <KittenInput
            autoCapitalize="none"
            autoCorrect={false}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            ref={inputRef}
            {...props}
        />
    );
}
