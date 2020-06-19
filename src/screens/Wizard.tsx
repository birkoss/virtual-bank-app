import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";

import {
    Text,
    Card,
    StyleService,
    useStyleSheet,
    Button,
} from "@ui-kitten/components";

import Screen from "../components/Screen";

import { APIStats } from "../api";
import { WizardScreenNavigationProp, Account, Goal } from "../types";
import { UserContext } from "../contexts";
import { MenuIcon, UsersIcon } from "../icons";

type Props = {
    navigation: WizardScreenNavigationProp;
};

export default function WizardScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);
    const { state } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [goal, setGoal] = useState<Goal | undefined>(undefined);

    const getStats = () => {
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

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setIsLoading(true);
            getStats();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Screen isLoading={isLoading} title="Wizard" navigation={navigation}>
            <View style={{ padding: 20 }}>
                <Card
                    style={styles.cardContainer}
                    header={(props) => (
                        <View {...props}>
                            <Text category="h6">Creating Users</Text>
                        </View>
                    )}
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                >
                    <Text category="h6" style={styles.paragraph}>
                        You must create users to be able to make transactions.
                    </Text>
                    <Button
                        status="primary"
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                    >
                        Open the menu
                    </Button>
                </Card>

                <Card
                    style={styles.cardContainer}
                    header={(props) => (
                        <View {...props}>
                            <Text category="h6">
                                <UsersIcon /> Creating Categories
                            </Text>
                        </View>
                    )}
                >
                    <Text category="h6" style={styles.paragraph}>
                        You must create at least one categories to be able to
                        make transactions.
                    </Text>
                    <Button
                        status="primary"
                        onPress={() => {
                            navigation.openDrawer();
                        }}
                    >
                        Open the menu
                    </Button>
                </Card>

                <View>
                    <Button appearance="ghost" status="basic">
                        I know what to do. Skip the wizard!
                    </Button>
                </View>
            </View>
        </Screen>
    );
}

const themeStyles = StyleService.create({
    cardContainer: {
        marginBottom: 20,
    },
    paragraph: {
        marginBottom: 20,
    },
});
