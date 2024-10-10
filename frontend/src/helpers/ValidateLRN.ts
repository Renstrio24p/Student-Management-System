
export const validateLRN = (lrn: string) => {
    const lrnRegex = /^[0-9]{12}$/;
    return lrnRegex.test(lrn);
}