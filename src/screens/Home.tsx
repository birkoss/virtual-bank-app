import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";

import { Text, Card, StyleService, useStyleSheet } from "@ui-kitten/components";

import { ProgressCircle } from "react-native-svg-charts";

import Screen from "../components/Screen";

import { APIStats } from "../api";
import { HomeScreenNavigationProp, Account, Goal } from "../types";
import { UserContext } from "../contexts";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);
    const { state } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [goal, setGoal] = useState<Goal | undefined>(undefined);

    const getStats = () => {
        setIsLoading(true);
        APIStats(state.token)
            .then((data) => {
                data["accounts"].forEach((account: Account) => {
                    setBalance(account.balance);
                });
                setGoal(undefined);
                data["goals"].forEach((goal: Goal) => {
                    setGoal(goal);
                });
                setIsLoading(false);
            })
            .catch((error) => console.log("error", error));
    };

    // @TODO: Test full stack -> Empty user -> Wizards -> Login as
    useFocusEffect(
        React.useCallback(() => {
            getStats();
        }, [])
    );

    return (
        <Screen isLoading={isLoading} title="Dashboard" navigation={navigation}>
            <View style={{ padding: 20 }}>
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

                {goal !== undefined && (
                    <Card
                        style={styles.cardContainer}
                        header={(props) => (
                            <View {...props}>
                                <Text category="h6">Your goal</Text>
                            </View>
                        )}
                        footer={(props) => (
                            <View {...props}>
                                <Text category="h6">{goal.name}</Text>
                            </View>
                        )}
                    >
                        <View style={styles.goalAmountsContainer}>
                            <Text category="h5">
                                {balance} / {goal.amount} $
                            </Text>
                        </View>
                        <ProgressCircle
                            progressColor="#FF4C58"
                            startAngle={-Math.PI * 0.8}
                            endAngle={Math.PI * 0.8}
                            style={styles.goalChart}
                            progress={balance / goal.amount}
                        />
                    </Card>
                )}
            </View>
        </Screen>
    );
}

const themeStyles = StyleService.create({
    cardContainer: {
        marginBottom: 20,
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
