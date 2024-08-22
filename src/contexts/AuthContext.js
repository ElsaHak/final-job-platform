 import React, { createContext, useState, useEffect } from 'react';
 import { getItem, setItem, removeItem } from '../utils/Storage';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


