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

import {
    SendMoneyScreenNavigationProp,
    SendMoneyScreenRouteProp,
} from "../types";

type Props = {
    navigation: SendMoneyScreenNavigationProp;
    route: SendMoneyScreenRouteProp;
};

export default function SendMoneyScreen({ navigation, route }: Props) {
    const styles = useStyleSheet(themeStyles);

    const changeUser = (userID: string) => {
        console.log("New UserID: ", userID);
    };

    React.useEffect(() => {
        if (route.params?.newUserID) {
            changeUser(route.params.newUserID);
        }
    }, [route.params?.newUserID]);

    return (
        <Screen title="Send Money" navigation={navigation}>
            <KeyboardAvoidingView style={styles.container}>
                <ListItem
                    style={styles.box}
                    title="To:"
                    description="Mathieu Robichaud"
                    accessoryLeft={(props) => (
                        <Icon {...props} name="person-outline" />
                    )}
                    accessoryRight={() => (
                        <Button
                            size="tiny"
                            onPress={() =>
                                navigation.push("ChangeUser", {
                                    userID: "moi",
                                    users: ["toi", "moi"],
                                })
                            }
                        >
                            CHANGE
                        </Button>
                    )}
                />

                <ListItem
                    style={styles.box}
                    title="Type:"
                    description="Rewards"
                    accessoryLeft={(props) => (
                        <Icon {...props} name="pricetags-outline" />
                    )}
                    accessoryRight={() => <Button size="tiny">CHANGE</Button>}
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

                <ButtonLoading label="Send Money" style={styles.box} />
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
