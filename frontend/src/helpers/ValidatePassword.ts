export const validatePassword = (password: string) => {
    // Regex now checks for at least:
    // - One lowercase letter
    // - One uppercase letter
    // - One number
    // - One special character
    // - Minimum 8 characters
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}
