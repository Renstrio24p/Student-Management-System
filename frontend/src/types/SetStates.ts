import { Dispatch, SetStateAction } from "react";

export type SetStates = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    role: string;
    isLogin: boolean;
    accessKey: string;
    error: string | null;
    setEmail: Dispatch<SetStateAction<string>>;
    setFirstName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    setRole: Dispatch<SetStateAction<string>>;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
    setAccessKey: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string | null>>
};