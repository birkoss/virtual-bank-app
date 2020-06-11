import { StyleService } from "@ui-kitten/components";

export const onePagerStyles = StyleService.create({
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
        paddingTop: 32,
        paddingHorizontal: 16,
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
