import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/icons-material/CheckBoxOutlineBlank';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../firebase';

const EditProfile = () => {
    const { currentUser, updatePassword, updateUsername } = useAuth();
    const history = useHistory();

    const [imageUpload, setImageUpload] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    storage
        .ref(`profile/${currentUser.displayName}`)
        .child('avatar.png')
        .getDownloadURL()
        .then((url) => {
            setImagePreview(url);
        })
        .catch((e) => console.log('Errors while downloading => ', e));

    const [editUsername, setEditUsername] = useState(currentUser.displayName);
    const [editUsernameBool, setEditUsernameBool] = useState(false);

    const [editPassword, setEditPassword] = useState('');
    const [editPasswordBool, setEditPasswordBool] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [editConfirmPassword, setEditConfirmPassword] = useState('');

    const [responseMsg, setResponseMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const initialValues = {
        username: currentUser.displayName,
        password: currentUser.password,
    };

    const handleUploadedFiles = (e) => {
        if (e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setImageUpload(e.target.files[0]);
        }
    };

    const handleProfilePictureUpload = () => {
        // TODO Add button to confirm upload
        const uploadTask = storage.ref(`profile/${currentUser.displayName}/${imageUpload.name}`).put(imageUpload);
        uploadTask.on(
            'state_changed',
            (snapshot) => { },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref(`profile/${currentUser.displayName}`)
                    .child('avatar.png')
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                    });
            },
        );
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Show the TextFields where the user can edit their details
    const handleEditIconClick = (type) => {
        if (type === 'username') {
            setEditUsernameBool(true);
        } else if (type === 'password') {
            setEditPasswordBool(true);
        }
    };

    let validPassword = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?=*&]).{8,})$/.test(editPassword);
    let validPasswords = editPassword === editConfirmPassword ? true : false;

    let validFormPassword = validPasswords && validPassword ? true : false;

    let overallValidation = validFormPassword && !loading ? true : false;

    // Update the password
    const handleUpdatePassword = async () => {
        if (editPassword !== editConfirmPassword) {
            return setResponseMsg('Passwords do not match');
        }
        try {
            setResponseMsg('');
            setLoading(true);
            await updatePassword(editPassword);
            // history.push('/user/home');
            setResponseMsg('Password Updated!')
            setEditPasswordBool(false);
        } catch (err) {
            setResponseMsg("Error updating password, please try again.");
        }
        setLoading(false);
    };

    //Update the username
    const handleUpdateUsername = async () => {
        try {
            setResponseMsg('');
            setLoading(true);
            await updateUsername(editUsername);
            // history.push('/user/home');
            setResponseMsg('Username updated!')
            setEditUsernameBool(false);
        } catch (err) {
            setResponseMsg("Error updating username. Please try agian.");
        }
        setLoading(false);
    };

    // When the user wants to update their profile information
    // Reflect this updated information on the front-end and in the DB
    const handleCheckIconClick = (type) => {
        if (type === 'username') {
            handleUpdateUsername();
            initialValues.username = editUsername;
        } else if (type === 'password') {
            handleUpdatePassword();
            initialValues.password = editPassword;
        }
    };

    // When the user wants to cancel whatever edits they have made to either username or password
    // The values will default back to what they originally were before any edits
    const handleCancelIconClick = (type) => {
        if (type === 'username') {
            setEditUsername(initialValues.username);
            setEditUsernameBool(false);
        } else if (type === 'password') {
            setEditPassword(initialValues.password);
            setEditPasswordBool(false);
        }
    };

    const handleBackClick = () => {
        history.push('/user/profile');
    };
    return (
        <div className='profile-container'>
            <div className='card-container'>
                <div className='edit-profile-header'>Edit Profile</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        className='profile-avatar-image'
                        src={imagePreview}
                        alt='avatar'
                    />
                    <Button
                        variant='contained'
                        component='label'
                        style={{
                            textTransform: 'none',
                            borderRadius: '500px',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#f4faff',
                            color: 'var(--button-blue)',
                            fontFamily: 'Spartan-R',
                            fontSize: '1rem',
                            boxShadow: 'none',
                        }}>
                        <span className='edit-profile-profile-pic-header'>Change profile picture</span>
                        <input type='file' name='files' accept='image/png, image/gif, image/jpeg' hidden onChange={handleUploadedFiles} />
                    </Button>

                    {editUsernameBool ? (
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', width: '100%' }}>
                            <div>
                                <div style={{ fontFamily: 'Spartan-B', fontSize: '1.5rem', marginBottom: '0' }}>Username</div>
                                <div>
                                    <FormControl style={{ marginTop: '0.5rem', width: '90%', fontFamily: 'Spartan-R' }} variant='standard'>
                                        <Input
                                            id='standard-adornment-password'
                                            type='text'
                                            value={editUsername}
                                            onChange={(e) => {
                                                setEditUsername(e.target.value);
                                                setResponseMsg('');
                                            }}
                                            endAdornment={
                                                <InputAdornment disablePointerEvents position='end'>
                                                    <IconButton edge='end'>
                                                        <Box style={{ color: 'white' }} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <Tooltip title='Save'>
                                <CheckIcon onClick={() => handleCheckIconClick('username')} className='edit-profile-icon' style={{ color: 'green', fontSize: 25 }} />
                            </Tooltip>
                            <Tooltip title='Cancel'>
                                <CloseIcon onClick={() => handleCancelIconClick('username')} className='edit-profile-icon' style={{ color: 'red', fontSize: 25 }} />
                            </Tooltip>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem auto 2rem 0', position: 'relative', width: '100%' }}>
                            <div style={{ fontFamily: 'Spartan-B', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Username</div>
                            <div style={{ fontSize: '1.2rem' }}>{initialValues.username}</div>
                            <Tooltip title='Edit Username' placement='right'>
                                <EditIcon
                                    onClick={() => handleEditIconClick('username')}
                                    className='edit-profile-icon'
                                    style={{ position: 'absolute', right: '0', top: '25%', fontSize: 25 }}
                                />
                            </Tooltip>
                        </div>
                    )}

                    {editPasswordBool ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontFamily: 'Spartan-B', fontSize: '1.5rem', marginBottom: '0' }}>Password</div>
                                <div>
                                    <FormControl style={{ marginTop: '0.5rem', width: '90%', fontFamily: 'Spartan-R' }} variant='standard'>
                                        <InputLabel htmlFor='standard-adornment-password'>New Password</InputLabel>
                                        <Input
                                            id='standard-adornment-password'
                                            type={showPassword ? 'text' : 'password'}
                                            value={editPassword}
                                            onChange={(e) => {
                                                setEditPassword(e.target.value);
                                                setResponseMsg('');
                                            }}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge='end'>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label='New Password'
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl style={{ marginTop: '0.5rem', width: '90%', fontFamily: 'Spartan-R' }} variant='standard'>
                                        <InputLabel htmlFor='standard-adornment-password'>Confirm Password</InputLabel>
                                        <Input
                                            id='standard-adornment-password'
                                            type={showPassword ? 'text' : 'password'}
                                            value={editConfirmPassword}
                                            onChange={(e) => {
                                                setEditConfirmPassword(e.target.value);
                                                setResponseMsg('');
                                            }}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge='end'>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label='Confirm Password'
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <Tooltip title='Save'>
                                <CheckIcon disabled={overallValidation ? false : true} onClick={() => handleCheckIconClick('password')} className='edit-profile-icon' style={{ color: overallValidation ? 'green' : '#DCDCDC', fontSize: 25 }} />
                            </Tooltip>
                            <Tooltip title='Cancel'>
                                <CloseIcon onClick={() => handleCancelIconClick('password')} className='edit-profile-icon' style={{ color: 'red', fontSize: 25 }} />
                            </Tooltip>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto 0 0', position: 'relative', width: '100%' }}>
                            <div style={{ fontFamily: 'Spartan-B', fontSize: '1.5rem' }}>Password</div>
                            <Tooltip title='Edit Password' placement='right'>
                                <EditIcon
                                    onClick={() => handleEditIconClick('password')}
                                    className='edit-profile-icon'
                                    style={{ position: 'absolute', right: '0', top: '-25%', fontSize: 25 }}
                                />
                            </Tooltip>
                        </div>
                    )}
                    {responseMsg && <p style={{ color: 'red' }}>{responseMsg}</p>}
                    <Button
                        onClick={handleBackClick}
                        style={{
                            textTransform: 'none',
                            borderRadius: '500px',
                            padding: '0.5rem 1.5rem',
                            backgroundColor: '#0077b6',
                            color: 'white',
                            fontFamily: 'Spartan-B',
                            fontSize: '1rem',
                            marginTop: '2rem',
                        }}
                        variant='contained'>
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
