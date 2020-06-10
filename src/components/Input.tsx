import React, { useRef } from "react";
import { Input as KittenInput } from "@ui-kitten/components";

function Input(props) {
    const inputRef = useRef();
    return (
        <KittenInput
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            ref={inputRef}
            {...props}
        />
    );
}

export default Input;
