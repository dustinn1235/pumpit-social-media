import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '../images/barbell.png';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

import AppContext from '../context/AppContext';

const SignIn = () => {
    const history = useHistory();
    const { setIsSignedIn, user, setUser } = useContext(AppContext);

    const [showError, setShowError] = useState(false);

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    let validForm = values.username === '' || values.password === '' ? false : true;

    const handleSignInClick = () => {
        // TODO Validate form values
        // values.username and values.password match an account in the DB

        // If the DB call is false, run the code below
        // setShowError(true);
        // setValues({ ...values, password: '' });

        // If the DB call is true, run the code below
        setUser({ ...user, username: values.username, password: values.password });
        setIsSignedIn(true);
        history.push('/user/home');
    };

    const handleGoToSignUpClick = () => {
        history.push('/signup');
    };

    return (
        <div className='sign-in-container'>
            <div className='card-container'>
                <div className='card-header-icon-container'>
                    <img className='card-icon' src={Icon} alt='barbell' />
                    <div className='card-header'>Sign In</div>
                    <div className='card-sub-header'>
                        to continue to <span style={{ color: 'var(--top-grad)' }}>ProjectName</span>
                    </div>
                </div>

                {showError ? (
                    <div style={{ margin: '1rem 0 0 0' }} className='card-header-icon-container'>
                        <div style={{ color: 'red' }} className='card-sub-header'>
                            Incorrect Password
                        </div>
                    </div>
                ) : null}

                <TextField style={{ marginTop: '2rem' }} value={values.username} onChange={handleChange('username')} id='outlined-basic' label='Username' variant='outlined' />

                <FormControl style={{ margin: '2rem 0' }} variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                    <OutlinedInput
                        id='outlined-adornment-password'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Password'
                    />
                </FormControl>

                <Button
                    disabled={validForm ? false : true}
                    onClick={handleSignInClick}
                    style={{
                        textTransform: 'none',
                        borderRadius: '500px',
                        padding: '0.5rem 1rem',
                        width: '50%',
                        margin: '0 auto',
                        backgroundColor: validForm ? 'var(--top-grad)' : 'var(--grey-blue)',
                        color: validForm ? 'white' : '#DCDCDC',
                        fontFamily: 'Spartan-B',
                        fontSize: '1.25rem',
                    }}
                    variant='contained'>
                    Sign In
                </Button>

                <hr style={{ width: '100%', margin: '2rem 0' }} />

                <div className='helper-text-container'>
                    <div className='helper-header'>Don't have an account?</div>
                    <div onClick={handleGoToSignUpClick} className='helper-link' style={{ color: 'var(--top-grad)' }}>
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
