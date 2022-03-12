import React from 'react';
import Icon from '../images/barbell.png';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <div className='navbar-icon-header-container'>
                <img className='navbar-icon' src={Icon} alt='barbell' />
                <span className='navbar-header'>ProjectName</span>
            </div>
            <div className='navbar-links-container'>
                <div className='navbar-link'>Sign In</div>
                <div className='navbar-link'>Sign Up</div>
            </div>
        </div>
    );
};

export default Navbar;
