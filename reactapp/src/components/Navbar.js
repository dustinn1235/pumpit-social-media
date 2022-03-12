import React, { useContext } from 'react';
import Icon from '../images/barbell.png';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Navbar = () => {
    // History variable is used to update the path of the site
    const history = useHistory();
    const location = useLocation();

    // Function that takes the path of the clicked item on the navbar to update the route
    const handleNavbarClick = (route) => {
        history.push(route);
    };

    const { isSignedIn, setIsSignedIn } = useContext(AppContext);

    return (
        <div className='navbar-container'>
            {isSignedIn ? (
                <>
                    <div
                        onClick={() => {
                            handleNavbarClick('/user/home');
                        }}
                        className='navbar-icon-header-container'>
                        <img className='navbar-icon' src={Icon} alt='barbell' />
                        <span className='navbar-header'>ProjectName</span>
                    </div>
                    <div className='navbar-links-container'>
                        <div className={location.pathname === '/user/home' ? 'navbar-link-clicked' : 'navbar-link'}>Home</div>
                        <div className={location.pathname === '/user/profile' ? 'navbar-link-clicked' : 'navbar-link'}>Profile</div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        onClick={() => {
                            handleNavbarClick('/');
                        }}
                        className='navbar-icon-header-container'>
                        <img className='navbar-icon' src={Icon} alt='barbell' />
                        <span className='navbar-header'>ProjectName</span>
                    </div>
                    <div className='navbar-links-container'>
                        <div
                            onClick={() => {
                                handleNavbarClick('/signin');
                            }}
                            className={location.pathname === '/signin' ? 'navbar-link-clicked' : 'navbar-link'}>
                            Sign In
                        </div>
                        <div
                            onClick={() => {
                                handleNavbarClick('/signup');
                            }}
                            className={location.pathname === '/signup' ? 'navbar-link-clicked' : 'navbar-link'}>
                            Sign Up
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
