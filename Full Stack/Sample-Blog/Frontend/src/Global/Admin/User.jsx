import React, { createContext, useContext } from 'react';
import useFetch from "@/utils/hooks/useFetch(auth)"; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { data, loading, error } = useFetch(`http://localhost:3000/users`, []); 

    return (
        <UserContext.Provider value={{ data, loading, error }}> 
            {children}
        </UserContext.Provider>
    );
};

export const useAdmin = () => useContext(UserContext);
