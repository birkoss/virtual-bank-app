import React from "react";

import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";

import Loading from "../components/Loading";

export default function LoadingScreen() {
    const styles = useStyleSheet(themeStyles);

    return (
        <Layout style={styles.container}>
            <Loading />
        </Layout>
    );
}

const themeStyles = StyleService.create({
    container: {
        backgroundColor: "background-basic-color-3",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
