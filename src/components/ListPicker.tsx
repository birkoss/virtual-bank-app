import React, { useState, Children, cloneElement, isValidElement } from "react";

import {
    Button,
    Modal,
    useStyleSheet,
    Layout,
    ListItem,
    StyleService,
} from "@ui-kitten/components";

import ErrorMessage from "../components/ErrorMessage";

import { ModalStyles } from "../styles";
import { FieldError } from "react-hook-form";

type Props = {
    title: string;
    description: string;
    icon: any;
    error: FieldError | undefined;
    children: any;
    onItemSelected: Function;
};

export default function ListPicker({
    title,
    description,
    icon,
    error,
    children,
    onItemSelected,
}: Props) {
    const [isModalVisible, showModal] = useState(false);

    const modalStyles = useStyleSheet(ModalStyles);

    const styles = useStyleSheet(themeStyles);

    const itemMainAction = () => {
        return (
            <Button size="tiny" onPress={() => showModal(true)}>
                CHANGE
            </Button>
        );
    };

    const chooseItem = (item: any) => {
        return (
            <Button
                size="tiny"
                onPress={() => {
                    showModal(false);
                    onItemSelected(item);
                }}
            >
                SELECT
            </Button>
        );
    };

    const childrenWithProps = cloneElement(children, {
        action: chooseItem,
    });

    return (
        <Layout style={styles.box}>
            <ListItem
                title={title}
                description={description}
                accessoryLeft={icon}
                accessoryRight={itemMainAction}
                onPress={() => showModal(true)}
            />
            <ErrorMessage field={error} />

            <Modal
                style={{ flex: 1, width: "70%" }}
                visible={isModalVisible}
                backdropStyle={modalStyles.backdrop}
                onBackdropPress={() => showModal(false)}
            >
                {childrenWithProps}
            </Modal>
        </Layout>
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
