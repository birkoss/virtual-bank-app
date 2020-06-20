const APIUrl = "https://api.walleteur.app/v1/";
//const APIUrl = "http://localhost:8000/v1/";

class ApiError extends Error {
    constructor(...params: any[]) {
        super(...params);
        this.name = "ApiError";
    }
}

function APICreateRequest(
    endpoint: string,
    method: string,
    body: any = null,
    token: string = ""
) {
    method = method.toUpperCase();

    let headers = new Headers();
    if (token !== "") {
        headers.append("Authorization", "Token " + token);
    }
    headers.append("Content-Type", "application/json");

    let request = new Request(APIUrl + endpoint, {
        headers,
        method,
        body: body !== null ? JSON.stringify(body) : null,
    });

    return request;
}

function APIFetchRequest(request: Request, response: Function) {
    return fetch(request)
        .then((response) => response.json())
        .then((data: any) => {
            // Everything is fine from the API
            if (data["status"] && data["status"] === 200) {
                return response(data);
            }

            // Errors from the API
            if (data["message"]) {
                if (
                    typeof data["message"] === "object" &&
                    data["message"] !== null
                ) {
                    for (let field in data["message"]) {
                        throw new ApiError(
                            field + ": " + data["message"][field].join(" ")
                        );
                    }
                } else {
                    throw new ApiError(data["message"]);
                }
            }

            // Special case for Token error (to logout the user)
            if (data["detail"] && data["detail"] == "Invalid token.") {
                throw new ApiError(data["detail"]);
            }

            // Generic error
            throw new ApiError("An error occurred please try again later.");
        })
        .catch((error) => {
            if (error.name !== "ApiError") {
                throw new Error("An error occurred please try again later.");
            }

            throw error;
        });
}

export function APISendMoney(token: string, transaction: object) {
    let request = APICreateRequest("sendMoney", "POST", transaction, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            balance: data["balance"],
        };
    });
}

export function APIWithdrawMoney(token: string, transaction: object) {
    let request = APICreateRequest("withdrawMoney", "POST", transaction, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            balance: data["balance"],
        };
    });
}

export function APIAddTransactionsCategories(token: string, category: object) {
    let request = APICreateRequest(
        "transactionsCategories",
        "POST",
        category,
        token
    );

    return APIFetchRequest(request, (data: any) => {
        return {};
    });
}

export function APIAddGoal(token: string, goal: object) {
    let request = APICreateRequest("goals", "POST", goal, token);

    return APIFetchRequest(request, (data: any) => {
        return {};
    });
}

export function APIAddUser(token: string, user: object) {
    let request = APICreateRequest("users", "POST", user, token);

    return APIFetchRequest(request, (data: any) => {
        return {};
    });
}

export function APIDeleteTransactionsCategories(
    token: string,
    categoryID: string
) {
    let request = APICreateRequest(
        "transactionsCategories/" + categoryID,
        "DELETE",
        null,
        token
    );
    return APIFetchRequest(request, (data: any) => {
        return {};
    });
}

export function APIDeleteGoals(token: string, goalID: string) {
    let request = APICreateRequest("goals/" + goalID, "DELETE", null, token);
    return APIFetchRequest(request, (data: any) => {
        return {};
    });
}

export function APIDeleteUser(token: string, userID: string) {
    let request = APICreateRequest(
        "users/" + userID.toString(),
        "DELETE",
        null,
        token
    );
    return APIFetchRequest(request, (data: any) => {
        return {};
    });
}

export function APIListTransactions(token: string) {
    let request = APICreateRequest("transactions", "GET", null, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            transactions: data["transactions"],
        };
    });
}

export function APITransactionsStats(token: string) {
    let request = APICreateRequest("transactionsStats", "GET", null, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            transactionsCategories: data["transactionsCategories"],
        };
    });
}

export function APIListTransactionsCategories(token: string) {
    let request = APICreateRequest(
        "transactionsCategories",
        "GET",
        null,
        token
    );

    return APIFetchRequest(request, (data: any) => {
        return {
            transactionsCategories: data["transactionsCategories"],
        };
    });
}

export function APIListGoals(token: string) {
    let request = APICreateRequest("goals", "GET", null, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            goals: data["goals"],
        };
    });
}

export function APIListFamilyMembers(token: string) {
    let request = APICreateRequest("familyMembers", "GET", null, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            users: data["users"],
        };
    });
}

export function APIListUsers(token: string) {
    let request = APICreateRequest("users", "GET", null, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            users: data["users"],
        };
    });
}

export function APILogin(email: string, password: string) {
    let request = APICreateRequest("login", "POST", { email, password });

    return APIFetchRequest(request, (data: any) => {
        return {
            token: data["token"],
        };
    });
}

export function APIStats(token: string) {
    let request = APICreateRequest("stats", "GET", null, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            accounts: data["accounts"],
            goals: data["goals"],
        };
    });
}

export function APIRegister(
    email: string,
    password: string,
    firstname: string,
    lastname: string
) {
    let request = APICreateRequest("register", "POST", {
        email,
        password,
        firstname,
        lastname,
    });

    return APIFetchRequest(request, (data: any) => {
        return {
            token: data["token"],
        };
    });
}

export function APIAccountData(token: string) {
    let request = APICreateRequest("account", "GET", null, token);

    return APIFetchRequest(request, (data: any) => {
        return {
            account: data["account"],
            needWizard: data["need_wizard"],
        };
    });
}
