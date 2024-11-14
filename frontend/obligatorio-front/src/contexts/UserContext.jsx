import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de usuario
const UserContext = createContext();

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const updateUser = (userData) => {
        setUser(userData.data);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userData');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);