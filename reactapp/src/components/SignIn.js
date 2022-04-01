import React, { useState } from 'react';
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
import { red } from '@mui/material/colors';

import { useAuth } from '../context/AuthContext';

const SignIn = () => {
    const { signin, currentUser } = useAuth();
    const history = useHistory();

    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [values, setValues] = React.useState({
        email: '',
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

    let validForm = values.email === '' || values.password === '' ? false : true;

    const handleSignInClick = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signin(values.email, values.password);
            history.push('/user/home');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
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

                {/* New Version */}
                <form className='sign-up-form' onSubmit={handleSignInClick}>
                    <TextField style={{ marginTop: '2rem' }} value={values.email} onChange={handleChange('email')} id='outlined-basic' label='Email' variant='outlined' />

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

                    {error && <p style={{ color: red }}>{error}</p>}
                    <Button
                        disabled={validForm ? false : true}
                        type='submit'
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
                </form>

                <hr style={{ width: '100%', margin: '2rem 0' }} />

                <div className='helper-text-container'>
                    <div className='helper-header'>Don't have an account?</div>
                    <div onClick={handleGoToSignUpClick} className='helper-link' style={{ color: 'var(--top-grad)' }}>
                        Sign Up
                    </div>
                    {/* <Link to="/signup">Sign Up</Link> */}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
