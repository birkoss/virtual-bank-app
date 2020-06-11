import React, { useContext } from "react";

import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/Home";
import RegisterScreen from "../screens/Register";
import TransactionsScreen from "../screens/Transactions";

import {
    HomeIcon,
    TransactionsIcon,
    SendMoneyIcon,
    ReceiveMoney,
} from "../icons";

import {
    AuthStackParamList,
    HomeStackParamList,
    TransactionsStackParamList,
} from "../types";
import { UserContext } from "../contexts";

const AuthStack = createStackNavigator<AuthStackParamList>();

const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    );
};

const TransactionsStack = createStackNavigator<TransactionsStackParamList>();
const TransactionsStackScreen = () => {
    return (
        <TransactionsStack.Navigator headerMode="none">
            <TransactionsStack.Screen
                name="Transactions"
                component={TransactionsScreen}
            />
        </TransactionsStack.Navigator>
    );
};

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
    return (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}
        >
            <BottomNavigationTab
                title={state.index === 0 ? "Home" : undefined}
                icon={HomeIcon}
            />
            <BottomNavigationTab
                title={state.index === 1 ? "Transactions" : undefined}
                icon={TransactionsIcon}
            />
            <BottomNavigationTab
                title={state.index === 2 ? "Send" : undefined}
                icon={SendMoneyIcon}
            />
            <BottomNavigationTab
                title={state.index === 3 ? "Receive" : undefined}
                icon={ReceiveMoney}
            />
        </BottomNavigation>
    );
};

const Tabs = createBottomTabNavigator();
const TabsScreen = () => {
    return (
        <Tabs.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Tabs.Screen name="Home" component={HomeStackScreen} />
            <Tabs.Screen
                name="Transactions"
                component={TransactionsStackScreen}
            />
            <Tabs.Screen name="Send" component={HomeStackScreen} />
            <Tabs.Screen name="Receive" component={HomeStackScreen} />
        </Tabs.Navigator>
    );
};

const Drawer = createDrawerNavigator();

export default function Navigation() {
    const { state } = useContext(UserContext);

    return (
        <NavigationContainer>
            {state.isAuthenticated ? (
                <Drawer.Navigator>
                    <Drawer.Screen
                        name="Home"
                        component={TabsScreen}
                        options={{
                            drawerLabel: "Home",
                            drawerIcon: ({ color }) => (
                                <Ionicons name="ios-home" color={color} />
                            ),
                        }}
                    />
                </Drawer.Navigator>
            ) : (
                <AuthStack.Navigator headerMode="none">
                    <AuthStack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            animationEnabled: false,
                        }}
                    />
                    <AuthStack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{
                            animationEnabled: false,
                        }}
                    />
                </AuthStack.Navigator>
            )}
        </NavigationContainer>
    );
}
