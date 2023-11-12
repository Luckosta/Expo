type AuthState = {
    isAuthenticated: boolean;
    user: UserData | null;
    error: string | null;
};

type RootState = {
    auth: AuthState;
};

type UserData = {
    username: string;
    login: string;
    password: string;
};
