import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export type DrawerParamList = {
    Home: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};
export type LoginScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    "Login"
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    "Register"
>;

export type HomeStackParamList = {
    Home: undefined;
};
export type HomeScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<HomeStackParamList>
>;

export type TransactionsStackParamList = {
    Transactions: undefined;
};
export type TransactionsScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<TransactionsStackParamList>
>;
