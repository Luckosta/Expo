type AuthState = {
    isAuthenticated: boolean;
    user: string | null;
    error: string | null;
};

type RootState = {
    auth: AuthState;
};
