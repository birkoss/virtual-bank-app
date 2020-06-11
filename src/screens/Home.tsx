import React from "react";
import { View } from "react-native";

import {
    Text,
    Layout,
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
            <View>
                <Text category="h1">Total Balance : 100 $</Text>
                <Text category="h2">Current Goal : 150 $</Text>
                <ProgressCircle
                    progressColor="#FF4C58"
                    startAngle={0}
                    endAngle={180}
                    style={styles.goalChart}
                    progress={0.97}
                />
            </View>
        </Screen>
    );
}

const themeStyles = StyleService.create({
    goalChart: {
        progressColor: "red",
        height: 200,
        color: "yellow",
    },
});
