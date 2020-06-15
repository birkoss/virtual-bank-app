import React, { useContext, Children } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Divider, Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";
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
    LogoutIcon,
} from "../icons";
import { UserContext } from "../contexts";

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
    const { state: contextState, dispatch } = useContext(UserContext);

    // @TODO : Close the drawer when we logout

    let tabs = [];
    tabs.push(
        <DrawerItem
            title="Home"
            accessoryLeft={HomeIcon}
            accessoryRight={ForwardIcon}
        />
    );

    if (contextState.account?.is_children === false) {
        tabs.push(
            <DrawerItem
                title="Users"
                accessoryLeft={UsersIcon}
                accessoryRight={ForwardIcon}
            />
        );

        tabs.push(
            <DrawerItem
                title="Transactions Categories"
                accessoryLeft={TransactionsCategoriesIcon}
                accessoryRight={ForwardIcon}
            />
        );
    }
    tabs.push(
        <DrawerItem
            title="Logout"
            accessoryLeft={LogoutIcon}
            accessoryRight={ForwardIcon}
            onPress={() =>
                dispatch({
                    type: "LOGOUT",
                })
            }
        />
    );

    return (
        <Drawer
            header={Header}
            selectedIndex={selectedIndex}
            onSelect={(index: IndexPath) => {
                setSelectedIndex(index);
                navigation.navigate(state.routeNames[index.row]);
            }}
            children={tabs}
        />
    );
};

const styles = StyleSheet.create({
    header: {
        height: 128,
        flexDirection: "row",
        alignItems: "center",
    },
});
