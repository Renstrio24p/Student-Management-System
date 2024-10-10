import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from './api/axios';

type User = {
    id?: string;
    name: string;
    role: string;
} | null;

type AuthState = {
    user: User;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    logout: () => void;
    loginUser: (email: string, password: string, role: string) => Promise<void>;
    initializeUser: () => Promise<void>;
    registerUser: (email: string, password: string, role: string) => Promise<void>;
    updateUser: (id: string, name: string, role: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user: User) => {
                set(() => ({
                    user,
                    isAuthenticated: !!user,
                }));
            },

            logout: () => {
                sessionStorage.removeItem('token');
                set(() => ({
                    user: null,
                    isAuthenticated: false,
                }));
            },

            loginUser: async (email: string, password: string, role: string) => {
                try {
                    const response = await axios.post('/login', { email, password, role });

                    if (response.status === 200) {
                        sessionStorage.setItem('token', response.data.token);
                        const user = response.data.user;
                        set(() => ({
                            user,
                            isAuthenticated: true,
                        }));
                    } else {
                        console.error('Login failed:', response.data.message);
                    }
                } catch (error) {
                    console.error('Failed to log in user:', error);
                    set(() => ({
                        user: null,
                        isAuthenticated: false,
                    }));
                }
            },

            initializeUser: async () => {
                const token = sessionStorage.getItem('token');
                if (token) {
                    try {
                        const response = await axios.get('/token', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        if (response.status === 200) {
                            const user = response.data.user;
                            set(() => ({
                                user,
                                isAuthenticated: true,
                            }));
                        } else {
                            set(() => ({
                                user: null,
                                isAuthenticated: false,
                            }));
                        }
                    } catch (error) {
                        set(() => ({
                            user: null,
                            isAuthenticated: false,
                        }));
                    }
                }
            },

            registerUser: async (email: string, password: string, role: string) => {
                try {
                    const response = await axios.post('/addUser', { email, password, role });

                    if (response.status === 201) {
                        const user = response.data.user;
                        set(() => ({
                            user,
                            isAuthenticated: true,
                        }));
                    } else {
                        console.error('Registration failed:', response.data.message);
                    }
                } catch (error) {
                    console.error('Failed to register user:', error);
                }
            },

            updateUser: async (id: string, name: string, role: string) => {
                try {
                    const response = await axios.put(`/api/update/${id}`, { name, role });

                    if (response.status === 200) {
                        set((state) => ({
                            user: { ...state.user, name, role },
                        }));
                    } else {
                        console.error('Update failed:', response.data.message);
                    }
                } catch (error) {
                    console.error('Failed to update user:', error);
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
