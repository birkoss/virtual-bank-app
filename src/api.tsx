const APIUrl = "http://localhost:8000/api/";

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

function fetchRequest(request: Request, response: Function) {
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

    return fetchRequest(request, (data: any) => {
        return {
            token: data["token"],
        };
    });
}

export function APILogin(email: string, password: string) {
    let request = APICreateRequest("login", "POST", { email, password });

    return fetchRequest(request, (data: any) => {
        return {
            token: data["token"],
        };
    });
}

export function APIStats(token: string) {
    let request = APICreateRequest("stats", "GET", null, token);

    return fetchRequest(request, (data: any) => {
        return {
            accounts: data["accounts"],
        };
    });
}
