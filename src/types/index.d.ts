type AuthState = {
    isAuthenticated: boolean;
    user: UserData | null;
    error: string | null;
};

type UserPost = {
    id: string;
    author: string;
    title: string;
    content: string;
    image?: string;
};

type UserData = {
    username?: string;
    login?: string;
    password?: string;
    posts?: UserPost[];
};

type LoginPayload = {
    login: string;
    password: string;
};

type AuthType = 'YES' | 'NO';
