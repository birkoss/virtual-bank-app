// @TOOD : On error with children account, keep token and show message with retry button
// @TODO : On logout, remove the expo token in the server

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { SafeAreaProvider } from "react-native-safe-area-context";

import React, { useEffect, useReducer, useState } from "react";

import { AsyncStorage, StatusBar } from "react-native";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Navigation from "./src/components/Navigation";

import {
    UserContext,
    UserContextInitialValues,
    UserContextReducer,
} from "./src/contexts";

import { default as theme } from "./src/assets/theme.json";

import { APIAccountData, APISaveNotificationToken } from "./src/api";
import LoadingScreen from "./src/screens/Loading";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = useReducer(
        UserContextReducer,
        UserContextInitialValues
    );

    const getAccountData = () => {
        if (state.token === "") {
            return;
        }

        APIAccountData(state.token)
            .then((data) => {
                if (
                    data["needWizard"] &&
                    data["account"]["is_children"] === false
                ) {
                    dispatch({
                        type: "SHOW_WIZARD",
                        payload: {
                            status: true,
                        },
                    });
                }

                dispatch({
                    type: "SETDATA",
                    payload: {
                        account: data["account"],
                    },
                });

                registerForPushNotifications();

                setIsLoading(false);
            })
            .catch((error) => {
                console.log("GetData.catch", error);

                // Logout on every error. Let the login handle errors
                dispatch({
                    type: "LOGOUT",
                });

                setIsLoading(false);
            });
    };

    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token !== null) {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        token,
                    },
                });
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getWizardCompletedFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem("wizard_completed");
            if (token === "1") {
                dispatch({
                    type: "WIZARD_COMPLETED",
                });
            }

            getTokenFromStorage();
        } catch (error) {
            console.log(error);
        }
    };

    const registerForPushNotifications = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );

        // Must be granted to access Expo token
        if (status !== "granted") {
            //Alert.alert("No notification permissions: " + status);
            return;
        }

        // Get the token that identifies this device
        let expoToken = await Notifications.getExpoPushTokenAsync();

        // POST the token to your backend server from where you can retrieve it to send push notifications.
        APISaveNotificationToken(state.token, expoToken);
    };

    // Load the NeedWizard status from storage (and the user token from storage)
    useEffect(() => {
        getWizardCompletedFromStorage();
    }, []);

    // When we get a new User Token, refresh the account
    useEffect(() => {
        getAccountData();
    }, [state.token]);

    // Wait until everything is fine before rendering the App
    if (isLoading) {
        return (
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                <StatusBar barStyle="light-content" />
                <LoadingScreen />
            </ApplicationProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                <IconRegistry icons={EvaIconsPack} />
                <StatusBar barStyle="light-content" />
                <UserContext.Provider value={{ state, dispatch }}>
                    <Navigation />
                </UserContext.Provider>
            </ApplicationProvider>
        </SafeAreaProvider>
    );
}
