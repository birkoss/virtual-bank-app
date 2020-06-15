import React from "react";

import {
    useStyleSheet,
    StyleService,
    Layout,
    Text,
    Button,
} from "@ui-kitten/components";

type Props = {
    text: string;
    buttonText?: string;
    buttonAction?: any;
};

export default function EmptyList({ text, buttonText, buttonAction }: Props) {
    const styles = useStyleSheet(themeStyles);

    return (
        <Layout style={styles.container} level="1">
            <Text appearance="hint" style={styles.text}>
                {text}
            </Text>

            {buttonText && buttonAction && (
                <Button
                    appearance="ghost"
                    style={styles.link}
                    onPress={buttonAction}
                >
                    {buttonText}
                </Button>
            )}
        </Layout>
    );
}

const themeStyles = StyleService.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    text: {
        textAlign: "center",
    },
    link: {
        marginTop: 20,
    },
});
