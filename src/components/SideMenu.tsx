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

import {
    UsersIcon,
    HomeIcon,
    ForwardIcon,
    GoalIcon,
    TransactionsCategoriesIcon,
    LogoutIcon,
} from "../icons";
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
};

export const SideMenu = ({ navigation, state }: Props) => {
    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>();
    const { state: contextState, dispatch } = useContext(UserContext);

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
            title="Goals"
            accessoryLeft={GoalIcon}
            accessoryRight={ForwardIcon}
        />
    );

    tabs.push(
        <DrawerItem
            title="Logout"
            accessoryLeft={LogoutIcon}
            accessoryRight={ForwardIcon}
            onPress={() => {
                navigation.toggleDrawer();
                dispatch({
                    type: "LOGOUT",
                });
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
            children={tabs}
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
