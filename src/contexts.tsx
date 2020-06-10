import React from "react";
import { AsyncStorage } from "react-native";

type UserContextInitialStateType = {
    isAuthenticated: boolean;
    userID: number;
    token: string;
};

export const UserContextInitialValues = {
    isAuthenticated: false,
    userID: 0,
    token: "",
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
                userID: action.payload.id,
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
        default:
            console.log("action.type:" + action.type);
            return state;
    }
};
