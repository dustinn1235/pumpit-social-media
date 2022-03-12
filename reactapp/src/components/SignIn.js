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

const SignIn = () => {
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
        console.log('Sign In Clicked');
    };

    return (
        <div className='sign-in-container'>
            <div className='card-container'>
                <div className='card-header-icon-container'>
                    <img className='card-icon' src={Icon} alt='barbell' />
                    <div className='card-header'>Sign In</div>
                    <div className='card-sub-header'>
                        to continue to <span style={{ color: 'var(--button-blue)' }}>ProjectName</span>
                    </div>
                </div>

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
                    onKeyPress={(e) => e.key === 'Enter' && handleSignInClick()}
                    style={{
                        textTransform: 'none',
                        borderRadius: '500px',
                        padding: '0.5rem 1rem',
                        width: '50%',
                        margin: '0 auto',
                        backgroundColor: validForm ? 'var(--button-blue)' : 'gray',
                        color: validForm ? 'white' : '#DCDCDC',
                        fontFamily: 'Spartan-B',
                        fontSize: '1.25rem',
                    }}
                    variant='contained'>
                    Sign In
                </Button>
            </div>
        </div>
    );
};

export default SignIn;
