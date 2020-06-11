import React, { useState } from "react";

import { View } from "react-native";

import { PieChart } from "react-native-svg-charts";

import {
    useStyleSheet,
    StyleService,
    Text,
    Card,
    List,
    ListItem,
    Button,
    Icon,
} from "@ui-kitten/components";

import Screen from "../components/Screen";

import { TransactionsScreenNavigationProp } from "../types";

type Props = {
    navigation: TransactionsScreenNavigationProp;
};

export default function TransactionsScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);

    const [selectedSlice, setSelectedSlice] = useState({
        label: "",
        value: 0,
    });

    const transactionsData = new Array(8).fill({
        title: "Title for Item",
        description: "Description for Item",
    });

    const renderItemAccessory = (props: any) => (
        <Text style={styles.amountIn}>-10$</Text>
    );

    const renderItemIcon = (props: any) => (
        <Icon {...props} name="person-add-outline" />
    );

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={renderItemAccessory}
        />
    );

    const { label, value } = selectedSlice;
    const keys = ["google", "facebook", "linkedin", "youtube", "Twitter"];
    const values = [15, 25, 35, 45, 55];
    const colors = [
        "#FFE5DB",
        "#FFC5B7",
        "#FF9F93",
        "#FF7B78",
        "#FF4C58",
        "#DB3751",
        "#B7264A",
        "#931841",
        "#7A0E3C",
    ];
    const expensesData = keys.map((key, index) => {
        return {
            key,
            value: values[index],
            svg: { fill: colors[index] },
            arc: {
                outerRadius: 70 + values[index] + "%",
                padAngle: label === key ? 0.1 : 0,
            },
            onPress: () =>
                setSelectedSlice({ label: key, value: values[index] }),
        };
    });

    return (
        <Screen title="Transactions">
            <Card
                style={styles.cardContainer}
                header={(props) => (
                    <View {...props}>
                        <Text category="h6">Expenses</Text>

                        {label !== "" && (
                            <Text category="s1">
                                {label} : {value}
                            </Text>
                        )}
                    </View>
                )}
            >
                <PieChart
                    style={styles.pieChart}
                    outerRadius={"80%"}
                    innerRadius={"45%"}
                    data={expensesData}
                />
            </Card>

            <List
                data={transactionsData}
                style={styles.transactionsList}
                renderItem={renderItem}
            />
        </Screen>
    );
}

const themeStyles = StyleService.create({
    amountIn: {
        color: "color-success-default",
    },
    amountOut: {
        color: "color-danger-default",
    },
    cardContainer: {
        margin: 20,
    },
    pieChart: {
        height: 150,
    },
    transactionsList: {
        marginBottom: 20,
        marginHorizontal: 20,
    },
});
