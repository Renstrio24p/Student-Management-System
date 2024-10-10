import { SetStates } from "../types/SetStates";
import { validateAccessKey } from "./ValidateAccess";
import { validateEmail } from "./ValidateEmail";
import { validateLRN } from "./ValidateLRN";
import { validatePassword } from "./ValidatePassword";

const clearErrorAfterTimeout = (setter: SetStates) => {
    setTimeout(() => {
        setter.setError(null); // Clear the error after 3 seconds
    }, 3000);
};


export const validateForm = (setter: SetStates) => {
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

    if (setter.password.length < 8) {
        setter.setError("Password must be at least 8 characters long.");
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!validatePassword(setter.password)) {
        setter.setError(
            "Password must contain at least one uppercase letter, one lowercase letter, and one number."
        );
        setter.setPassword(""); // Reset password on regex failure
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!setter.isLogin && setter.password !== setter.confirmPassword) {
        setter.setError("Passwords do not match.");
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!setter.isLogin && !setter.accessKey) {
        setter.setError(`${setter.role === "Student" ? "Student LRN" : setter.role + " Access key"} is required.`);
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!setter.isLogin && setter.role === "Student" && setter.accessKey.length < 12) {
        setter.setError("Student LRN must be at least 12 characters long.");
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!setter.isLogin && (setter.role === "Teacher" || setter.role === "Admin") && setter.accessKey.length < 16) {
        setter.setError("Access key must be at least 16 characters long.");
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!setter.isLogin && setter.role === "Student" && !validateLRN(setter.accessKey)) {
        setter.setError("Invalid Student LRN");
        clearErrorAfterTimeout(setter);
        return false;
    }

    if (!setter.isLogin && setter.role === "Teacher" || setter.role === "Admin" && !validateAccessKey(setter.accessKey)) {
        setter.setError("Invalid Access Key");
        clearErrorAfterTimeout(setter);
        return false;
    }

    return true;
};
