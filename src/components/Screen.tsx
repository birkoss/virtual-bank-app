import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    TopNavigation,
    Divider,
    StyleService,
    useStyleSheet,
    Text,
} from "@ui-kitten/components";
import { View } from "react-native";
import LoadingScreen from "../screens/Loading";

type Props = {
    title: string;
    children: any;
    isLoading: boolean;
};

export default function Screen({ title, children, isLoading }: Props) {
    const styles = useStyleSheet(themeStyles);

    return (
        <SafeAreaView style={styles.container}>
            <TopNavigation
                alignment="center"
                title={() => <Text style={styles.title}>{title}</Text>}
                style={styles.topNavigation}
            />
            <Divider />
            <View style={styles.componentContainer}>
                {isLoading ? <LoadingScreen /> : [children]}
            </View>
        </SafeAreaView>
    );
}

const themeStyles = StyleService.create({
    container: {
        backgroundColor: "background-basic-color-1",
        flex: 1,
    },
    componentContainer: {
        backgroundColor: "background-basic-color-3",
        flex: 1,
    },
    title: {
        color: "color-primary-default",
        fontWeight: "bold",
    },
    topNavigation: {
        backgroundColor: "background-basic-color-1",
    },
});
