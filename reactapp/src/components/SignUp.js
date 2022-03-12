import React from 'react';
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

const SignUp = () => {
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

    let validForm = values.username === '' || values.password === '' ? false : true;
    let validPasswords = values.password === values.confirmpassword ? true : false;

    const handleSignInClick = () => {
        console.log('Sign In Clicked');
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
                    onClick={handleSignInClick}
                    onKeyPress={(e) => e.key === 'Enter' && handleSignInClick()}
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
            </div>
        </div>
    );
};

export default SignUp;
