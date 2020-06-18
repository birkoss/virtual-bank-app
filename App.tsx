// @TODO : Wizards for first login of parents (maybe when no users and categories)
// @TODO : Allow the creation of children without email and lastname
// @TODO : Allow the login with the UUID for children, and not their email
// @TODO : Fix the users list render when a children is there, to remove the email
// @TODO : Better login screen with children access (once approuved)
// @TODO : Allow push notification on login, save the expo token
// @TODO : On logout, remove the expo token in the server
// @TODO : Tests without internet connexion (once approuved)
// @TODO : Add goal (Limit and text)

import { SafeAreaProvider } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";

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

import { APIAccountData } from "./src/api";
import LoadingScreen from "./src/screens/Loading";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = React.useReducer(
        UserContextReducer,
        UserContextInitialValues
    );

    const getAccountData = () => {
        if (state.token === "") {
            return;
        }

        APIAccountData(state.token)
            .then((data) => {
                dispatch({
                    type: "SETDATA",
                    payload: {
                        account: data["account"],
                    },
                });

                //registerForPushNotifications();

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

    useEffect(() => {
        getTokenFromStorage();
    }, []);

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
