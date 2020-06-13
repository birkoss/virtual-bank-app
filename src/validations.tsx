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

export const validateAmount = (amount: number): string => {
    return amount > 0 ? "" : "Amount must be greater than 0";
};
