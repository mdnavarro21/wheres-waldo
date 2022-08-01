import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser ] = useState();
    const userSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])
    
    const values = {
        currentUser,
        userSignUp
    }

    return (
    <AuthContext.Provider value = { values }>
        { children }
    </AuthContext.Provider>
    )
}
