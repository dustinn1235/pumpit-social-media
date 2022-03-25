import React, { useContext } from 'react';
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
import Tooltip from '@mui/material/Tooltip';

import AppContext from '../context/AppContext';

const SignUp = () => {
    const history = useHistory();
    const { setIsSignedIn } = useContext(AppContext);

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        confirmpassword: '',
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

    let validPassword = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?=*&]).{8,})$/.test(values.password);
    let validPasswords = values.password === values.confirmpassword ? true : false;

    let validForm = values.username !== '' && validPasswords && validPassword ? true : false;

    const handleSignUpClick = () => {
        // TODO Send user info to DB
        // values.username and values.password
        setIsSignedIn(true);
        history.push('/user/home');
    };

    const handleGoToSignInClick = () => {
        history.push('/signin');
    };

    return (
        <div className='sign-in-container'>
            <div className='card-container'>
                <div className='card-header-icon-container'>
                    <img className='card-icon' src={Icon} alt='barbell' />
                    <div className='card-header'>Sign Up</div>
                    <div className='card-sub-header'>
                        for a <span style={{ color: 'var(--button-blue)' }}>ProjectName</span> account
                    </div>
                </div>

                <TextField style={{ marginTop: '2rem' }} value={values.username} onChange={handleChange('username')} id='outlined-basic' label='Username' variant='outlined' />

                <Tooltip
                    open={!validPassword && values.password !== ''}
                    placement={'right'}
                    title='Minimum eight characters, one lowercase, one uppercase, at least one number, and at least one special character'>
                    <FormControl style={{ marginTop: '2rem' }} variant='outlined'>
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
                </Tooltip>

                <FormControl style={{ margin: '2rem 0' }} variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>Confirm Password</InputLabel>
                    <OutlinedInput
                        id='outlined-adornment-password'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmpassword}
                        onChange={handleChange('confirmpassword')}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Confirm Password'
                    />
                </FormControl>

                <Button
                    disabled={validForm && validPasswords ? false : true}
                    onClick={handleSignUpClick}
                    style={{
                        textTransform: 'none',
                        borderRadius: '500px',
                        padding: '0.5rem 1rem',
                        width: '50%',
                        margin: '0 auto',
                        backgroundColor: validForm && validPasswords ? 'var(--button-blue)' : 'gray',
                        color: validForm && validPasswords ? 'white' : '#DCDCDC',
                        fontFamily: 'Spartan-B',
                        fontSize: '1.25rem',
                    }}
                    variant='contained'>
                    Sign Up
                </Button>

                <hr style={{ width: '100%', margin: '2rem 0' }} />

                <div className='helper-text-container'>
                    <div className='helper-header'>Already have an account?</div>
                    <div onClick={handleGoToSignInClick} className='helper-link'>
                        Sign In
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
