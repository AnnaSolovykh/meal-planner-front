import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    login: (token: string, username: string) => void;
    logout: () => void;
}

const defaultAuthValue: AuthContextType = {
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthValue);

type AuthProviderProps = {
    children: ReactNode; 
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        setIsAuthenticated(!!jwtToken);
    }, []);

    const login = (jwtToken: string, username: string) => {
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('user', username);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);

