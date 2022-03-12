import AppContext from './AppContext';
import { useState } from 'react';

const AppState = (props) => {
    const usr = {
        username: '',
    };

    const [user, setUser] = useState(usr);
    const [isSignedIn, setIsSignedIn] = useState(0);

    return (
        <AppContext.Provider
            value={{
                isSignedIn,
                setIsSignedIn,
                user,
                setUser,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
