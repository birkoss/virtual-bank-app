import React from "react";
import { AsyncStorage } from "react-native";
import { User } from "./types";

type UserContextInitialStateType = {
    isAuthenticated: boolean;
    wizardCompleted: boolean;
    token: string;
    account: User | undefined;
};

export const UserContextInitialValues = {
    isAuthenticated: false,
    wizardCompleted: false,
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

            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        case "LOGOUT":
            AsyncStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                token: "",
            };
        case "CLOSE_WIZARD":
            try {
                /* await */ AsyncStorage.setItem("wizard_completed", "1");
            } catch (error) {
                console.log(
                    "UserContextReducer/AsyncStorage.setItem - wizard_completed",
                    error
                );
            }

            return {
                ...state,
                wizardCompleted: true,
            };
        default:
            console.log("action.type:" + action.type);
            return state;
    }
};
