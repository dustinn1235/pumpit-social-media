import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, username, password) {
        return auth.createUserWithEmailAndPassword(email, password);

        // need a updateProfile import or something to get the username in the db as well
        // .then(() => {
        //     auth.updateProfile(auth.currentUser, {
        //         displayName: username,
        //     })
        // });
    }

    function signin(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signout(){
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
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
    };

    return(
       <AuthContext.Provider value={value}>
           {!loading && children}
        </AuthContext.Provider>
    );
}