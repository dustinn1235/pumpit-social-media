import { Switch, Route, useRouteMatch } from 'react-router-dom';
import React, { lazy } from 'react';
// css
import '../../styles.css';

const User = ({ children }) => {
    const { url } = useRouteMatch();

    const HomeLazy = lazy(() => import('../user/Home'));

    return (
        <>
            <div>{children}</div>
            <div>
                <Switch>
                    <Route exact path={`${url}/home`} render={(props) => <HomeLazy {...props} />} />
                </Switch>
            </div>
        </>
    );
};

export default User;
