import React from "react";
import { View } from "react-native";

import {
    Text,
    Layout,
    Card,
    StyleService,
    useStyleSheet,
} from "@ui-kitten/components";

import { ProgressCircle } from "react-native-svg-charts";

import Screen from "../components/Screen";

import { HomeScreenNavigationProp } from "../types";

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);
    return (
        <Screen title="Dashboard">
            <Card
                style={styles.cardContainer}
                header={(props) => (
                    <View {...props}>
                        <Text category="h6">Your balance</Text>
                    </View>
                )}
            >
                <Text category="h1" style={styles.balanceCardAmount}>
                    100$
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
                    <Text category="h5">100 / 150 $</Text>
                </View>
                <ProgressCircle
                    progressColor="#FF4C58"
                    startAngle={0}
                    endAngle={180}
                    style={styles.goalChart}
                    progress={0.97}
                />
            </Card>
        </Screen>
    );
}

const themeStyles = StyleService.create({
    cardContainer: {
        margin: 20,
        marginTop: 40,
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
