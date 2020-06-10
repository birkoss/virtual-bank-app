import React from "react";

import { StatusBar } from "react-native";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import Navigation from "./src/components/Navigation";

import {
    UserContext,
    UserContextInitialValues,
    UserContextReducer,
} from "./src/contexts";

import { default as theme } from "./src/assets/theme.json";

export default function App() {
    const [state, dispatch] = React.useReducer(
        UserContextReducer,
        UserContextInitialValues
    );

    return (
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <StatusBar barStyle="light-content" />
            <UserContext.Provider value={{ state, dispatch }}>
                <Navigation />
            </UserContext.Provider>
        </ApplicationProvider>
    );
}
