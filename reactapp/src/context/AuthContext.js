import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { updateProfile } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, username, password) {
        return auth.createUserWithEmailAndPassword(email, password).then(() => 
        {
            updateProfile(auth.currentUser, {
                displayName: username,
            })
        });
    }

    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signout() {
        return auth.signOut();
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function updateUsername(username) {
        return updateProfile(auth.currentUser, {
            displayName: username,
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signin,
        signup,
        signout,
        updatePassword,
        updateUsername,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
