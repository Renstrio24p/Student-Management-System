import { SetStates } from "../types/SetStates";
import { validateEmail } from "./ValidateEmail";

const clearErrorAfterTimeout = (setter: SetStates) => {
    setTimeout(() => {
        setter.setError(null); // Clear the error after 3 seconds
    }, 3000);
};

export const validateLogin = (setter: SetStates) => {

    if (!setter.email) {
        setter.setError("Email is required.");
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!validateEmail(setter.email)) {
        setter.setError("Please enter a valid email address.");
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!setter.role) {
        setter.setError("Please select a role.");
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!setter.password) {
        setter.setError("Password is required.");
        clearErrorAfterTimeout(setter);
        return false;
    }
    return true
}