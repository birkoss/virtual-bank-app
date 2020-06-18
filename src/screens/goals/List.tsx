import React, { useState, useEffect, useContext } from "react";

import { Button, TopNavigationAction } from "@ui-kitten/components";

import Screen from "../../components/Screen";

import { AddIcon } from "../../icons";
import { APIListGoals, APIDeleteGoals } from "../../api";

import { GoalsScreenNavigationProp, Goal } from "../../types";
import { Alert } from "react-native";
import { UserContext } from "../../contexts";
import EmptyList from "../../components/EmptyList";

import Goals from "../../components/Goals";

type Props = {
    navigation: GoalsScreenNavigationProp;
};

export default function GoalsListScreen({ navigation }: Props) {
    const { state } = useContext(UserContext);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const askConfirmation = (goal: Goal) => {
        Alert.alert(
            "Confirmation",
            'Deleting  "' + goal.name + '" will also delete all of its data.',
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () =>
                        APIDeleteGoals(state.token, goal.id)
                            .then(() => getList())
                            .catch((error) => Alert.alert(error.message)),
                },
            ],
            { cancelable: false }
        );
    };

    const addGoal = () => {
        navigation.push("Add");
    };

    const deleteGoal = (goal: Goal) => (
        <Button size="tiny" onPress={() => askConfirmation(goal)}>
            DELETE
        </Button>
    );

    const getList = () => {
        setIsLoading(true);

        APIListGoals(state.token)
            .then((data) => {
                let newGoals: Goal[] = [];
                data["goals"].forEach((goal: Goal) => {
                    newGoals.push(goal);
                });
                setGoals(newGoals);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setIsLoading(true);
            getList();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <Screen
            isLoading={isLoading}
            navigation={navigation}
            title="Goals"
            secondaryAction={() => (
                <TopNavigationAction onPress={() => addGoal()} icon={AddIcon} />
            )}
        >
            {goals.length === 0 && (
                <EmptyList
                    text="No goals"
                    buttonText="Add a new goal"
                    buttonAction={() => addGoal()}
                />
            )}

            {goals.length !== 0 && <Goals goals={goals} action={deleteGoal} />}
        </Screen>
    );
}
