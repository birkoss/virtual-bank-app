import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";

import { Text, Card, StyleService, useStyleSheet } from "@ui-kitten/components";

import { ProgressCircle } from "react-native-svg-charts";

import Screen from "../components/Screen";

import { APIStats } from "../api";
import { HomeScreenNavigationProp, Account } from "../types";
import { UserContext } from "../contexts";

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);
    const { state } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [goal, setGoal] = useState(150);

    const getStats = () => {
        APIStats(state.token)
            .then((data) => {
                data["accounts"].forEach((account: Account) => {
                    setBalance(account.balance);
                });
                setIsLoading(false);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setIsLoading(true);
            getStats();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Screen isLoading={isLoading} title="Dashboard">
            <Card
                style={styles.cardContainer}
                header={(props) => (
                    <View {...props}>
                        <Text category="h6">Your balance</Text>
                    </View>
                )}
            >
                <Text category="h1" style={styles.balanceCardAmount}>
                    {balance} $
                </Text>
            </Card>

            <Card
                style={styles.cardContainer}
                header={(props) => (
                    <View {...props}>
                        <Text category="h6">Your goal</Text>
                    </View>
                )}
            >
                <View style={styles.goalAmountsContainer}>
                    <Text category="h5">
                        {balance} / {goal} $
                    </Text>
                </View>
                <ProgressCircle
                    progressColor="#FF4C58"
                    startAngle={-Math.PI * 0.8}
                    endAngle={Math.PI * 0.8}
                    style={styles.goalChart}
                    progress={balance / goal}
                />
            </Card>
        </Screen>
    );
}

const themeStyles = StyleService.create({
    cardContainer: {
        margin: 20,
        marginTop: 20,
        marginBottom: 0,
    },
    balanceCardAmount: {
        textAlign: "center",
    },
    goalChart: {
        progressColor: "red",
        height: 200,
        color: "yellow",
    },
    goalAmountsContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});
