import React, { useContext, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContext from '../../context/AppContext';

// Authorize page
import AuthRoute from './AuthRoute';

// Spinner to show when loading a page on slower machines
import Loading from '../Loading';

// Pages used before signing in
import LandingPage from '../LandingPage';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

import PageNotFound from '../PageNotFound';

const UserLazy = React.lazy(() => import('./User'));

function Routes() {
    const { isSignedIn } = useContext(AppContext);
    return (
        <>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/signin' exact component={SignIn} />
                <Route path='/signup' exact component={SignUp} />

                <Suspense fallback={<Loading />}>
                    {/* === User Sign In Required */}
                    <AuthRoute path='/user' isSignedIn={isSignedIn}>
                        <UserLazy />
                    </AuthRoute>
                    {/* If none of the paths above match, show the page not found */}
                    <Route component={PageNotFound} />
                </Suspense>
            </Switch>
        </>
    );
}

export default Routes;
