import { RouteProp } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
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

export type UsersStackParamList = {
    List: undefined;
    Add: undefined;
    Edit: undefined;
};
export type UsersScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<UsersStackParamList>
>;

export type TransactionsStackParamList = {
    Transactions: undefined;
};
export type TransactionsScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<TransactionsStackParamList>
>;

export type SendMoneyStackParamList = {
    SendMoney: {
        newUserID: string;
    };
    ChangeUser: {
        userID: string;
        users: string[];
    };
    ChangeCategory: undefined;
};
export type SendMoneyScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<SendMoneyStackParamList>
>;

export type SendMoneyChangeUserScreenRouteProp = RouteProp<
    SendMoneyStackParamList,
    "ChangeUser"
>;
export type SendMoneyScreenRouteProp = RouteProp<
    SendMoneyStackParamList,
    "SendMoney"
>;

export type Account = {
    id: string;
    balance: number;
};

export type User = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    is_children: boolean;
};
