import React from "react";

import { View } from "react-native";

import { Spinner } from "@ui-kitten/components";

export default function Loading() {
    return (
        <View
            style={{
                paddingTop: 4,
            }}
        >
            <Spinner status="basic" size="small" />
        </View>
    );
}
