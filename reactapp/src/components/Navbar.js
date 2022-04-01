import Icon from '../images/barbell.png';
import { useHistory, useLocation } from 'react-router-dom';
import Home from '@mui/icons-material/Home';
import Profile from '@mui/icons-material/AccountCircle';
import Goal from '@mui/icons-material/EmojiEvents';
import Add from '@mui/icons-material/AddCircleOutlineOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    // const { isSignedIn, setIsSignedIn } = useContext(AppContext);
    const { signout, currentUser } = useAuth();
    const [error, setError] = useState('');

    const isMobile = useMediaQuery('(max-width:500px)');

    const [toggleMenu, setToggleMenu] = useState(false);

    // History variable is used to update the path of the site
    const history = useHistory();
    const location = useLocation();

    // Function that takes the path of the clicked item on the navbar to update the route
    const handleNavbarClick = (route) => {
        history.push(route);
    };

    // Sign out user
    const handleSignOutClick = async () => {
        setError('');
        try {
            await signout();
            history.push('/');
        } catch {
            setError('Failed to sign out');
        }
    };

    return (
        <>
            <div className='navbar-container'>
                {currentUser ? (
                    <>
                        <div
                            onClick={() => {
                                handleNavbarClick('/user/home');
                            }}
                            className='navbar-icon-header-container'>
                            <img className='navbar-icon' src={Icon} alt='barbell' />
                            <span className='navbar-header'>PumpIt</span>
                        </div>
                        {isMobile ? (
                            <div>
                                {toggleMenu ? (
                                    <div className='navbar-menu-icon'>
                                        <CloseIcon
                                            onClick={() => {
                                                setToggleMenu(false);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className='navbar-menu-icon'>
                                        <MenuIcon
                                            onClick={() => {
                                                setToggleMenu(true);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='navbar-links-container'>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/user/home');
                                    }}
                                    className={location.pathname === '/user/home' ? 'navbar-link-clicked' : 'navbar-link'}>
                                    <Home fontSize={'large'} />
                                </div>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/user/post');
                                    }}
                                    className={location.pathname === '/user/post' ? 'navbar-link-clicked' : 'navbar-link'}>
                                    <Add fontSize={'large'} />
                                </div>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/user/workouts');
                                    }}
                                    className={location.pathname === '/user/workouts' ? 'navbar-link-clicked' : 'navbar-link'}>
                                    <Goal fontSize={'large'} />
                                </div>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/user/profile');
                                    }}
                                    className={location.pathname === '/user/profile' ? 'navbar-link-clicked' : 'navbar-link'}>
                                    <Profile fontSize={'large'} />
                                </div>
                                <div style={{ marginLeft: '1rem', fontSize: '1.25rem' }} onClick={handleSignOutClick} className='navbar-link'>
                                    Sign Out
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div
                            onClick={() => {
                                handleNavbarClick('/');
                            }}
                            className='navbar-icon-header-container'>
                            <img className='navbar-icon' src={Icon} alt='barbell' />
                            <span className='navbar-header'>PumpIt</span>
                        </div>
                        {isMobile ? (
                            <div>
                                {toggleMenu ? (
                                    <div className='navbar-menu-icon'>
                                        <CloseIcon
                                            onClick={() => {
                                                setToggleMenu(false);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className='navbar-menu-icon'>
                                        <MenuIcon
                                            onClick={() => {
                                                setToggleMenu(true);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className='navbar-links-container'>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/signin');
                                    }}
                                    style={{ marginRight: '1rem' }}
                                    className={location.pathname === '/signin' ? 'navbar-link-clicked' : 'navbar-link'}>
                                    Sign In
                                </div>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/signup');
                                    }}
                                    style={{ marginLeft: '1rem' }}
                                    className={location.pathname === '/signup' ? 'navbar-link-clicked' : 'navbar-link'}>
                                    Sign Up
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <>
                {currentUser ? (
                    <>
                        {toggleMenu ? (
                            <div className='navbar-menu-container'>
                                <div
                                    onClick={() => {
                                        setToggleMenu(false);
                                        handleNavbarClick('/user/home');
                                    }}
                                    className={location.pathname === '/' ? 'navbar-menu-link-clicked' : 'navbar-menu-link'}>
                                    Home
                                </div>
                                <div
                                    onClick={() => {
                                        setToggleMenu(false);
                                        handleNavbarClick('/user/post');
                                    }}
                                    className={location.pathname === '/' ? 'navbar-menu-link-clicked' : 'navbar-menu-link'}>
                                    New Post
                                </div>
                                <div
                                    onClick={() => {
                                        setToggleMenu(false);
                                        handleNavbarClick('/user/workouts');
                                    }}
                                    className={location.pathname === '/' ? 'navbar-menu-link-clicked' : 'navbar-menu-link'}>
                                    Workout
                                </div>
                                <div
                                    onClick={() => {
                                        setToggleMenu(false);
                                        handleNavbarClick('/user/profile');
                                    }}
                                    className={location.pathname === '/' ? 'navbar-menu-link-clicked' : 'navbar-menu-link'}>
                                    Profile
                                </div>
                                <div
                                    onClick={() => {
                                        setToggleMenu(false);
                                        handleSignOutClick();
                                    }}
                                    className={location.pathname === '/' ? 'navbar-menu-link-clicked' : 'navbar-menu-link'}>
                                    Sign Out
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <>
                        {toggleMenu ? (
                            <div className='navbar-menu-container'>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/');
                                        setToggleMenu(false);
                                    }}
                                    className={location.pathname === '/' ? 'navbar-menu-link-clicked' : 'navbar-menu-link'}>
                                    Home
                                </div>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/signin');
                                        setToggleMenu(false);
                                    }}
                                    className={location.pathname === '/signin' ? 'navbar-menu-link-clicked' : 'navbar-menu-link'}>
                                    Sign In
                                </div>
                                <div
                                    onClick={() => {
                                        handleNavbarClick('/signup');
                                        setToggleMenu(false);
                                    }}
                                    className={location.pathname === '/signup' ? 'navbar-menu-link-clicked' : 'navbar-menu-link'}>
                                    Sign Up
                                </div>
                            </div>
                        ) : null}
                    </>
                )}
            </>
        </>
    );
};

export default Navbar;
