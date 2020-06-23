import React, { useContext } from "react";
import { ImageBackground } from "react-native";
import {
    Divider,
    Drawer,
    DrawerItem,
    IndexPath,
    useStyleSheet,
    StyleService,
    Layout,
} from "@ui-kitten/components";
import { DrawerNavigationState } from "@react-navigation/native";

import { ForwardIcon, LogoutIcon } from "../icons";
import { UserContext } from "../contexts";

const Header = (props: any) => {
    const styles = useStyleSheet(themeStyles);

    return (
        <Layout style={styles.container}>
            <ImageBackground
                style={[props.style, styles.header]}
                source={require("../assets/icon.png")}
            />
            <Divider />
        </Layout>
    );
};

type Props = {
    navigation: any;
    state: DrawerNavigationState;
    tabs: any[];
};

export const SideMenu = ({ navigation, state, tabs }: Props) => {
    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>();
    const { state: contextState, dispatch } = useContext(UserContext);

    let menu = [];

    tabs.forEach((single_tab) => {
        menu.push(
            <DrawerItem
                title={single_tab.label}
                accessoryLeft={single_tab.icon}
                accessoryRight={ForwardIcon}
            />
        );
    });

    menu.push(
        <DrawerItem
            title="Logout"
            accessoryLeft={LogoutIcon}
            accessoryRight={ForwardIcon}
            onPress={() => {
                navigation.toggleDrawer();
                dispatch({
                    type: "LOGOUT",
                });
                navigation.navigate("Home");
            }}
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
            children={menu}
        />
    );
};

const themeStyles = StyleService.create({
    container: {
        backgroundColor: "color-primary-default",
    },
    header: {
        height: 128,
        width: 128,
        flexDirection: "row",
        alignSelf: "center",
    },
});
