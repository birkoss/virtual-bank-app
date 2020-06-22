import { StyleService } from "@ui-kitten/components";

export const FormStyles = StyleService.create({
    checkbox: {
        marginTop: 20,
    },
    explication: {
        marginTop: 20,
        padding: 20,
    },
    formContainerInputs: {
        flex: 1,
        flexGrow: 2,
        padding: 20,
        paddingTop: 0,
    },
    formContainerButtons: {
        padding: 20,
    },
    input: {
        marginTop: 20,
    },
    container: {
        backgroundColor: "background-basic-color-1",
        flex: 1,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 216,
        backgroundColor: "color-primary-default",
    },
    errorMessage: {},
    formContainer: {
        flex: 1,
        padding: 20,
    },
    subtitle: {
        marginTop: 16,
    },
    primaryActionButton: {
        marginHorizontal: 16,
    },
    secondaryActionButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
});

export const ThemeStyles = StyleService.create({
    container: {
        backgroundColor: "background-basic-color-1",
        flex: 1,
    },
});

export const LandingStyles = StyleService.create({
    container: {
        backgroundColor: "background-basic-color-1",
        flex: 1,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 216,
        backgroundColor: "color-primary-default",
    },
    errorMessage: {},
    formContainer: {
        flex: 1,
        padding: 20,
    },
    subtitle: {
        marginTop: 16,
    },
    primaryActionButton: {
        marginHorizontal: 16,
    },
    secondaryActionButton: {
        marginVertical: 12,
        marginHorizontal: 16,
    },
    forgotPasswordContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    input: {
        marginTop: 10,
    },
    forgotPasswordButton: {
        paddingHorizontal: 0,
    },
});

export const TabStyles = StyleService.create({
    container: {
        flex: 1,
    },
    tab: {
        padding: 10,
    },
});

export const ModalStyles = StyleService.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
