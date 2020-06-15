import React, { useContext } from "react";
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
    const { dispatch } = useContext(UserContext);
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
