import React, { useContext } from "react";

import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/Home";
import RegisterScreen from "../screens/Register";
import TransactionsScreen from "../screens/Transactions";

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
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    );
};

const TransactionsStack = createStackNavigator<TransactionsStackParamList>();
const TransactionsStackScreen = () => {
    return (
        <TransactionsStack.Navigator>
            <TransactionsStack.Screen
                name="Transactions"
                component={TransactionsScreen}
            />
        </TransactionsStack.Navigator>
    );
};

const Tabs = createBottomTabNavigator();
const TabsScreen = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-person" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Transactions"
                component={TransactionsStackScreen}
                options={{
                    tabBarLabel: "Users",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-person" size={size} color={color} />
                    ),
                }}
            />
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
