import React from "react";

import {
    TopNavigation,
    Divider,
    StyleService,
    useStyleSheet,
    Text,
    TopNavigationAction,
    Layout,
} from "@ui-kitten/components";
import { View } from "react-native";
import LoadingScreen from "../screens/Loading";

type ActionType = "menu" | "back" | "none";

type Props = {
    title: string;
    children: any;
    isLoading: boolean;
    navigation: any;
    mainActionType?: ActionType;
    secondaryAction?: () => JSX.Element;
};

import { MenuIcon, BackIcon } from "../icons";

export default function Screen({
    title,
    children,
    isLoading,
    navigation,
    secondaryAction,
    mainActionType,
}: Props) {
    const styles = useStyleSheet(themeStyles);

    const actionToggleMenu = () => {
        navigation.toggleDrawer();
    };
    const actionGoBack = () => {
        navigation.goBack();
    };

    const mainAction = () => {
        if (mainActionType === "none") {
            return <React.Fragment />;
        }

        return (
            <TopNavigationAction
                onPress={
                    mainActionType === "back" ? actionGoBack : actionToggleMenu
                }
                icon={mainActionType === "back" ? BackIcon : MenuIcon}
            />
        );
    };

    return (
        <Layout style={styles.container}>
            <TopNavigation
                alignment="center"
                title={() => <Text style={styles.title}>{title}</Text>}
                style={styles.topNavigation}
                accessoryLeft={mainAction}
                accessoryRight={secondaryAction}
            />
            <Divider />
            <View style={styles.componentContainer}>
                {isLoading ? <LoadingScreen /> : [children]}
            </View>
        </Layout>
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
