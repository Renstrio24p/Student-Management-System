export const validateAccessKey = (accessKey: string) => {
    const accessKeyRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return accessKeyRegex.test(accessKey);
}
