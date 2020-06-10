import React, { Component } from "react";

import { Layout, Button } from "@ui-kitten/components";

import { LoginScreenNavigationProp } from "../types";

type Props = {
    navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
    return (
        <Layout
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Button>HOME</Button>
        </Layout>
    );
}
