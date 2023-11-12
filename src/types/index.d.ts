type AuthState = {
    isAuthenticated: boolean;
    user: UserData | null;
    error: string | null;
};

type UserData = {
    username: string;
    login: string;
    password: string;
};

type LoginPayload = {
    login: string;
    password: string;
};
