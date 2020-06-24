import { User } from "./types";

export function GetUserFullname(user: User) {
    let fullname: string = "";

    if (user !== undefined) {
        fullname = user.firstname;

        if (!user.is_children) {
            fullname += " " + user.lastname;
        }
    }

    return fullname;
}
