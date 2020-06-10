export const validateEmail = (email: string): string => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ? ""
        : "Email must be valid";
};

export const validatePasswordConfirmation = (
    password: string,
    confirmation: string
): string => {
    return password === confirmation
        ? ""
        : "Password and Confirmation must match";
};
