import React from "react";
import { AsyncStorage } from "react-native";
import { User } from "./types";

type UserContextInitialStateType = {
    isAuthenticated: boolean;
    wizardCompleted: boolean;
    loginAs: boolean;
    token: string;
    account: User | undefined;
};

export const UserContextInitialValues = {
    isAuthenticated: false,
    wizardCompleted: true,
    loginAs: false,
    token: "",
    account: undefined,
};

export const UserContext = React.createContext<{
    state: UserContextInitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: UserContextInitialValues,
    dispatch: () => null,
});

export const UserContextReducer = (
    state: UserContextInitialStateType,
    action: any
) => {
    switch (action.type) {
        case "SETDATA":
            return {
                ...state,
                account: action.payload.account,
            };
        case "LOGIN":
            try {
                /* await */ AsyncStorage.setItem("token", action.payload.token);
            } catch (error) {
                console.log("UserContextReducer/AsyncStorage.setItem", error);
            }

            let showLoginAs: boolean = false;
            if (
                action.payload.loginAs !== undefined &&
                action.payload.loginAs === true
            ) {
                showLoginAs = true;
            }

            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        case "LOGOUT":
            AsyncStorage.removeItem("token");
            AsyncStorage.removeItem("wizard_completed");
            return {
                ...state,
                isAuthenticated: false,
                wizardCompleted: false,
                token: "",
            };
        case "WIZARD_COMPLETED":
            return {
                ...state,
                wizardCompleted: true,
            };
        case "LOGIN_AS":
            return {
                ...state,
                loginAs: action.payload.loginAs,
            };
        default:
            console.log("action.type:" + action.type);
            return state;
    }
};
