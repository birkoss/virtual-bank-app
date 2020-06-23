import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
    BottomNavigation,
    BottomNavigationTab,
    useStyleSheet,
} from "@ui-kitten/components";

import { SafeAreaView } from "react-native-safe-area-context";

import { SideMenu } from "../components/SideMenu";

import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/Home";
import RegisterScreen from "../screens/Register";
import TransactionsScreen from "../screens/Transactions";
import SendMoneyScreen from "../screens/SendMoney";
import WithdrawMoneyScreen from "../screens/WithdrawMoney";
import ChangeUserScreen from "../screens/ChangeUser";

import UsersListScreen from "../screens/users/List";
import UsersAddScreen from "../screens/users/Add";
import UsersAddChildrenScreen from "../screens/users/AddChildren";

import TransactionsCategoriesAddScreen from "../screens/transactions-categories/Add";
import TransactionsCategoriesListScreen from "../screens/transactions-categories/List";

import GoalsAddScreen from "../screens/goals/Add";
import GoalsListScreen from "../screens/goals/List";

import WizardScreen from "../screens/Wizard";
import LoginAsScreen from "../screens/LoginAs";

import {
    HomeIcon,
    TransactionsIcon,
    SendMoneyIcon,
    WithdrawMoneyIcon,
} from "../icons";

import {
    AuthStackParamList,
    HomeStackParamList,
    TransactionsStackParamList,
    SendMoneyStackParamList,
    UsersStackParamList,
    TransactionsCategoriesStackParamList,
    GoalsStackParamList,
    WizardStackParamList,
    LoginAsStackParamList,
} from "../types";
import { UserContext } from "../contexts";
import ChangeCategoryScreen from "../screens/ChangeCategory";
import { ThemeStyles } from "../styles";

const AuthStack = createStackNavigator<AuthStackParamList>();

const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    );
};

const WizardStack = createStackNavigator<WizardStackParamList>();
const WizardStackScreen = () => {
    return (
        <WizardStack.Navigator headerMode="none">
            <WizardStack.Screen name="Wizard" component={WizardScreen} />
        </WizardStack.Navigator>
    );
};

const LoginAsStack = createStackNavigator<LoginAsStackParamList>();
const LoginAsStackScreen = () => {
    return (
        <LoginAsStack.Navigator headerMode="none">
            <LoginAsStack.Screen name="LoginAs" component={LoginAsScreen} />
        </LoginAsStack.Navigator>
    );
};

const UsersStack = createStackNavigator<UsersStackParamList>();
const UsersStackScreen = () => {
    return (
        <UsersStack.Navigator headerMode="none">
            <UsersStack.Screen name="List" component={UsersListScreen} />
            <UsersStack.Screen name="Add" component={UsersAddScreen} />
            <UsersStack.Screen
                name="AddChildren"
                component={UsersAddChildrenScreen}
            />
        </UsersStack.Navigator>
    );
};

const TransactionsCategoriesStack = createStackNavigator<
    TransactionsCategoriesStackParamList
>();
const TransactionsCategoriesStackScreen = () => {
    return (
        <TransactionsCategoriesStack.Navigator headerMode="none">
            <TransactionsCategoriesStack.Screen
                name="List"
                component={TransactionsCategoriesListScreen}
            />
            <TransactionsCategoriesStack.Screen
                name="Add"
                component={TransactionsCategoriesAddScreen}
            />
        </TransactionsCategoriesStack.Navigator>
    );
};

const GoalsStack = createStackNavigator<GoalsStackParamList>();
const GoalsStackScreen = () => {
    return (
        <GoalsStack.Navigator headerMode="none">
            <GoalsStack.Screen name="List" component={GoalsListScreen} />
            <GoalsStack.Screen name="Add" component={GoalsAddScreen} />
        </GoalsStack.Navigator>
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
            <SendMoneyStack.Screen
                name="ChangeUser"
                component={ChangeUserScreen}
            />
            <SendMoneyStack.Screen
                name="ChangeCategory"
                component={ChangeCategoryScreen}
            />
        </SendMoneyStack.Navigator>
    );
};

const WithdrawMoneyStack = createStackNavigator<SendMoneyStackParamList>();
const WithdrawMoneyStackScreen = () => {
    return (
        <WithdrawMoneyStack.Navigator headerMode="none">
            <WithdrawMoneyStack.Screen
                name="WithdrawMoney"
                component={WithdrawMoneyScreen}
            />
            <WithdrawMoneyStack.Screen
                name="ChangeUser"
                component={ChangeUserScreen}
            />
            <WithdrawMoneyStack.Screen
                name="ChangeCategory"
                component={ChangeCategoryScreen}
            />
        </WithdrawMoneyStack.Navigator>
    );
};

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
    const { state: contextState } = useContext(UserContext);

    let children = [];

    children.push(
        <BottomNavigationTab
            title={state.index === 0 ? "Home" : undefined}
            icon={HomeIcon}
        />
    );

    children.push(
        <BottomNavigationTab
            title={state.index === 1 ? "Transactions" : undefined}
            icon={TransactionsIcon}
        />
    );

    children.push(
        <BottomNavigationTab
            title={state.index === 2 ? "Send" : undefined}
            icon={SendMoneyIcon}
        />
    );

    if (contextState.account?.is_children === false) {
        children.push(
            <BottomNavigationTab
                title={state.index === 3 ? "Withdraw" : undefined}
                icon={WithdrawMoneyIcon}
            />
        );
    }

    return (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}
            children={children}
        />
    );
};

const Tabs = createBottomTabNavigator();
const TabsScreen = () => {
    const { state } = useContext(UserContext);

    if (state.showWizard) {
        console.log(state.showWizard);
        return <WizardStackScreen />;
    }

    if (state.loginAs) {
        return <LoginAsStackScreen />;
    }

    return (
        <Tabs.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Tabs.Screen name="Home" component={HomeStackScreen} />
            <Tabs.Screen
                name="Transactions"
                component={TransactionsStackScreen}
            />
            <Tabs.Screen name="Send" component={SendMoneyStackScreen} />
            <Tabs.Screen name="Withdraw" component={WithdrawMoneyStackScreen} />
        </Tabs.Navigator>
    );
};

const Drawer = createDrawerNavigator();

export default function Navigation() {
    const { state } = useContext(UserContext);

    const styles = useStyleSheet(ThemeStyles);

    // @TODO refactor this and sidemenu into a single array
    let tabs = [];

    tabs.push(<Drawer.Screen name="Home" component={TabsScreen} />);

    if (state.account?.is_children === false) {
        tabs.push(<Drawer.Screen name="Users" component={UsersStackScreen} />);

        tabs.push(
            <Drawer.Screen
                name="Transactions Categories"
                component={TransactionsCategoriesStackScreen}
            />
        );
    }

    tabs.push(<Drawer.Screen name="Goals" component={GoalsStackScreen} />);

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                {state.isAuthenticated ? (
                    <Drawer.Navigator
                        children={tabs}
                        drawerContent={(props) => <SideMenu {...props} />}
                    ></Drawer.Navigator>
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
        </SafeAreaView>
    );
}
