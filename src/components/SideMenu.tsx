import React from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    ViewProps,
    StyleProp,
    ViewStyle,
} from "react-native";
import {
    Divider,
    Drawer,
    DrawerItem,
    IndexPath,
    DrawerProps,
} from "@ui-kitten/components";
import {
    NavigationHelpers,
    DrawerNavigationState,
} from "@react-navigation/native";
import { DrawerNavigationEventMap } from "@react-navigation/drawer/lib/typescript/src/types";

import {
    UsersIcon,
    HomeIcon,
    ForwardIcon,
    TransactionsCategoriesIcon,
} from "../icons";

const Header = (props: any) => {
    return (
        <React.Fragment>
            <ImageBackground
                style={[props.style, styles.header]}
                source={require("../assets/icon.png")}
            />
            <Divider />
        </React.Fragment>
    );
};

type Props = {
    navigation: NavigationHelpers<
        Record<string, object | undefined>,
        DrawerNavigationEventMap
    >;
    state: DrawerNavigationState;
};

export const SideMenu = ({ navigation, state }: Props) => {
    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>();
    return (
        <Drawer
            header={Header}
            selectedIndex={selectedIndex}
            onSelect={(index: IndexPath) => {
                setSelectedIndex(index);
                navigation.navigate(state.routeNames[index.row]);
            }}
        >
            <DrawerItem
                title="Home"
                accessoryLeft={HomeIcon}
                accessoryRight={ForwardIcon}
            />
            <DrawerItem
                title="Users"
                accessoryLeft={UsersIcon}
                accessoryRight={ForwardIcon}
            />
            <DrawerItem
                title="Transactions Categories"
                accessoryLeft={TransactionsCategoriesIcon}
                accessoryRight={ForwardIcon}
            />
        </Drawer>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 128,
        flexDirection: "row",
        alignItems: "center",
    },
});
