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

import { SideMenu } from "../components/SideMenu";

import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/Home";
import RegisterScreen from "../screens/Register";
import TransactionsScreen from "../screens/Transactions";
import SendMoneyScreen from "../screens/SendMoney";
import UsersListScreen from "../screens/users/List";
import UsersAddScreen from "../screens/users/Add";

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
    SendMoneyStackParamList,
    UsersStackParamList,
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

const UsersStack = createStackNavigator<UsersStackParamList>();
const UsersStackScreen = () => {
    return (
        <UsersStack.Navigator headerMode="none">
            <UsersStack.Screen name="List" component={UsersListScreen} />
            <UsersStack.Screen name="Add" component={UsersAddScreen} />
        </UsersStack.Navigator>
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

const SendMoneyStack = createStackNavigator<SendMoneyStackParamList>();
const SendMoneyStackScreen = () => {
    return (
        <SendMoneyStack.Navigator headerMode="none">
            <SendMoneyStack.Screen
                name="SendMoney"
                component={SendMoneyScreen}
            />
        </SendMoneyStack.Navigator>
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
            <Tabs.Screen name="Send" component={SendMoneyStackScreen} />
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
                <Drawer.Navigator
                    drawerContent={(props) => <SideMenu {...props} />}
                >
                    <Drawer.Screen name="Home" component={TabsScreen} />
                    <Drawer.Screen name="Users" component={UsersStackScreen} />
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
