import { Switch, Route, useRouteMatch } from 'react-router-dom';
import React, { lazy } from 'react';
import '../../styles.css';

const User = ({ children }) => {
    const { url } = useRouteMatch();

    const HomeLazy = lazy(() => import('../user/Home'));
    const ProfileLazy = lazy(() => import('../user/Profile'));

    return (
        <>
            <div>{children}</div>
            <div>
                <Switch>
                    <Route exact path={`${url}/home`} render={(props) => <HomeLazy {...props} />} />
                    <Route exact path={`${url}/profile`} render={(props) => <ProfileLazy {...props} />} />
                </Switch>
            </div>
        </>
    );
};

export default User;
