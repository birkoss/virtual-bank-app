import React from "react";

import Navigation from "./src/components/Navigation";

import {
    UserContext,
    UserContextInitialValues,
    UserContextReducer,
} from "./src/contexts";

export default function App() {
    const [state, dispatch] = React.useReducer(
        UserContextReducer,
        UserContextInitialValues
    );

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <Navigation />
        </UserContext.Provider>
    );
}
