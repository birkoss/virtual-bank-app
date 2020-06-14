import "intl";
import "intl/locale-data/jsonp/en";

import React, { useState, useEffect, useContext } from "react";

import { View, Alert } from "react-native";

import { PieChart, PieChartData } from "react-native-svg-charts";

import {
    useStyleSheet,
    StyleService,
    Text,
    Card,
    List,
    ListItem,
    Icon,
} from "@ui-kitten/components";

import Screen from "../components/Screen";

import {
    TransactionsScreenNavigationProp,
    Transaction,
    TransactionCategory,
} from "../types";
import { UserContext } from "../contexts";
import { APIListTransactions, APITransactionsStats } from "../api";

type Props = {
    navigation: TransactionsScreenNavigationProp;
};

export default function TransactionsScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);
    const { state } = useContext(UserContext);

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expensesStats, setExpensesStats] = useState<PieChartData[]>([]);

    const [selectedSlice, setSelectedSlice] = useState({
        label: "",
        value: 0,
    });

    const renderItem = ({ item }: { item: Transaction }) => (
        <ListItem
            title={
                item.account_to.id !== state.userID
                    ? item.account_to.user.firstname +
                      " " +
                      item.account_to.user.lastname
                    : item.account_from.user.firstname +
                      " " +
                      item.account_from.user.lastname
            }
            description={new Intl.DateTimeFormat("en-CA", {
                year: "numeric",
                month: "long",
                day: "2-digit",
            }).format(Date.parse(item.date_added))}
            accessoryLeft={(props) => (
                <Icon {...props} name="person-add-outline" />
            )}
            accessoryRight={() => (
                <Text
                    style={
                        item.account_to.id === state.userID
                            ? styles.amountIn
                            : styles.amountOut
                    }
                >
                    {item.account_to.id === state.userID ? "" : "-"}
                    {item.amount}$
                </Text>
            )}
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

    const getStats = () => {
        APITransactionsStats(state.token)
            .then((data) => {
                let stats: PieChartData[] = [];
                data["transactionsCategories"].forEach(
                    (transaction: TransactionCategory, index: number) => {
                        stats.push({
                            key: transaction.name,
                            value: transaction.transactions,
                            svg: {
                                fill: colors[index],
                                onPress: () =>
                                    setSelectedSlice({
                                        label: transaction.name,
                                        value: transaction.transactions,
                                    }),
                            },
                            arc: {
                                outerRadius:
                                    70 + transaction.transactions + "%",
                            },
                        });
                    }
                );
                setExpensesStats(stats);

                setIsLoading(false);
            })
            .catch((error) => Alert.alert(error.message));
    };

    const getTransactions = () => {
        setIsLoading(true);
        APIListTransactions(state.token)
            .then((data) => {
                let newTransactions: Transaction[] = [];
                data["transactions"].forEach((transaction: Transaction) => {
                    newTransactions.push(transaction);
                });
                setTransactions(newTransactions);

                getStats();
            })
            .catch((error) => Alert.alert(error.message));
    };

    // Load the transactions list from the API on each page reload
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setIsLoading(true);
            getTransactions();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Screen
            isLoading={isLoading}
            navigation={navigation}
            title="Transactions"
        >
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
                    data={expensesStats}
                />
            </Card>

            <List
                data={transactions}
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
