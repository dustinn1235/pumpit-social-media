import { Switch, Route, useRouteMatch } from 'react-router-dom';
import React, { lazy } from 'react';
import '../../styles.css';

const User = ({ children }) => {
    const { url } = useRouteMatch();

    const HomeLazy = lazy(() => import('../user/Home'));
    const ProfileLazy = lazy(() => import('../user/Profile'));
    const EditProfileLazy = lazy(() => import('../user/EditProfile'));
    const WorkoutsLazy = lazy(() => import('../user/Workouts'));
    const NewPostLazy = lazy(() => import('../user/NewPost'));
    const PageNotFoundLazy = lazy(() => import('../PageNotFound'));

    return (
        <>
            <div>{children}</div>
            <div>
                <Switch>
                    <Route exact path={`${url}/home`} render={(props) => <HomeLazy {...props} />} />
                    <Route exact path={`${url}/workouts`} render={(props) => <WorkoutsLazy {...props} />} />
                    <Route exact path={`${url}/post`} render={(props) => <NewPostLazy {...props} />} />
                    <Route exact path={`${url}/profile`} render={(props) => <ProfileLazy {...props} />} />
                    <Route exact path={`${url}/editprofile`} render={(props) => <EditProfileLazy {...props} />} />
                    <Route render={(props) => <PageNotFoundLazy {...props} />} />
                </Switch>
            </div>
        </>
    );
};

export default User;
