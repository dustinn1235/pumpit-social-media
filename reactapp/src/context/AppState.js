import AppContext from './AppContext';
import { useState } from 'react';

const AppState = (props) => {
    const [isSignedIn, setIsSignedIn] = useState(0);

    return (
        <AppContext.Provider
            value={{
                isSignedIn,
                setIsSignedIn,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
