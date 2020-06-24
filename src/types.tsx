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

export type WizardStackParamList = {
    Wizard: undefined;
};
export type WizardScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<WizardStackParamList>
>;

export type LoginAsStackParamList = {
    LoginAs: undefined;
};
export type LoginAsScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<LoginAsStackParamList>
>;

export type UsersStackParamList = {
    List: undefined;
    Add: undefined;
    AddChildren: undefined;
    Edit: undefined;
};
export type UsersScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<UsersStackParamList>
>;

export type TransactionsCategoriesStackParamList = {
    List: undefined;
    Add: undefined;
    Edit: undefined;
};
export type TransactionsCategoriesScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<UsersStackParamList>
>;

export type GoalsStackParamList = {
    List: undefined;
    Add: undefined;
    Edit: undefined;
};
export type GoalsScreenNavigationProp = CompositeNavigationProp<
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
        newAccountID?: string;
        newCategoryID?: string;
    };
    WithdrawMoney: {
        newAccountID?: string;
        newCategoryID?: string;
    };
};
export type SendMoneyScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<SendMoneyStackParamList>
>;

export type SendMoneyScreenRouteProp = RouteProp<
    SendMoneyStackParamList,
    "SendMoney"
>;

export type Account = {
    id: string;
    balance: number;
    user: User;
};

export type User = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    is_children: boolean;
    accounts: Account[];
    token: string;
};

export type TransactionCategory = {
    id: string;
    name: string;
    transactions: number;
};

export type Transaction = {
    id: string;
    amount: number;
    category: TransactionCategory;
    date_added: string;
    account_to: Account;
    account_from: Account;
    description: string;
};

export type Goal = {
    id: string;
    name: string;
    amount: number;
};
