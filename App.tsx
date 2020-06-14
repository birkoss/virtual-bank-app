import React, { useEffect, useState } from "react";

import { AsyncStorage, StatusBar } from "react-native";

import * as eva from "@eva-design/eva";
import {
    ApplicationProvider,
    IconRegistry,
    Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Navigation from "./src/components/Navigation";

import {
    UserContext,
    UserContextInitialValues,
    UserContextReducer,
} from "./src/contexts";

import { default as theme } from "./src/assets/theme.json";
import Loading from "./src/components/Loading";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = React.useReducer(
        UserContextReducer,
        UserContextInitialValues
    );

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

                setIsLoading(false);
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

    // Wait until everything is fine before rendering the App
    if (isLoading) {
        return (
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                <StatusBar barStyle="light-content" />
                {/* @TODO Replace with LoadingScreen */}
                <Layout
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Loading />
                </Layout>
            </ApplicationProvider>
        );
    }

    return (
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <IconRegistry icons={EvaIconsPack} />
            <StatusBar barStyle="light-content" />
            <UserContext.Provider value={{ state, dispatch }}>
                <Navigation />
            </UserContext.Provider>
        </ApplicationProvider>
    );
}
