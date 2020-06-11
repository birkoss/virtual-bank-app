import React from "react";
import { View } from "react-native";

import {
    Text,
    Card,
    StyleService,
    useStyleSheet,
    ListItem,
    Icon,
    Button,
} from "@ui-kitten/components";

import Input from "../components/Input";
import ButtonLoading from "../components/ButtonLoading";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import Screen from "../components/Screen";

import { HomeScreenNavigationProp } from "../types";

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function SendMoneyScreen({ navigation }: Props) {
    const styles = useStyleSheet(themeStyles);

    const InstallButton = (props: any) => <Button size="tiny">CHANGE</Button>;

    const ItemImage = (props: any) => <Icon {...props} name="person-outline" />;
    const RequestTypeIcon = (props: any) => (
        <Icon {...props} name="pricetags-outline" />
    );

    return (
        <Screen title="Send Money">
            <KeyboardAvoidingView style={styles.container}>
                <ListItem
                    style={styles.box}
                    title="To:"
                    description="Mathieu Robichaud"
                    accessoryLeft={ItemImage}
                    accessoryRight={InstallButton}
                />

                <ListItem
                    style={styles.box}
                    title="Type:"
                    description="Rewards"
                    accessoryLeft={RequestTypeIcon}
                    accessoryRight={InstallButton}
                />

                <Card
                    style={styles.box}
                    header={(props) => (
                        <View {...props}>
                            <Text category="h6">Amount</Text>
                        </View>
                    )}
                    footer={(props) => (
                        <View {...props} style={styles.inputsContainer}>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +1
                            </Button>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +2
                            </Button>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +5
                            </Button>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +10
                            </Button>
                            <Button
                                size="tiny"
                                style={styles.inputAdjustAmount}
                            >
                                +20
                            </Button>
                        </View>
                    )}
                >
                    <Input
                        returnKeyType="go"
                        style={styles.input}
                        keyboardType="number-pad"
                        placeholder="Amount"
                    />
                </Card>

                <ButtonLoading
                    label="Send Money"
                    style={styles.primaryActionButton}
                />
            </KeyboardAvoidingView>
        </Screen>
    );
}

const themeStyles = StyleService.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    box: {
        marginVertical: 10,
    },
    input: {
        fontSize: 40,
        color: "red",
    },
    inputsContainer: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    inputAdjustAmount: {
        margin: 5,
    },
});
