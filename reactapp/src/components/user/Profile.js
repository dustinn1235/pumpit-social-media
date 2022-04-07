import React, { useState } from 'react';
import ProfilePosts from './ProfilePosts';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../firebase';
import PulseLoader from 'react-spinners/PulseLoader';

const Profile = () => {
    const { currentUser } = useAuth();

    const [imagePreview, setImagePreview] = useState('');

    storage
        .ref(`profile/${currentUser.displayName}`)
        .child('avatar.png')
        .getDownloadURL()
        .then((url) => {
            console.log(url);
            setImagePreview(url);
        })
        .catch((e) => {
            console.log('Errors while downloading => ', e);
            // Default image used for profile picture
            setImagePreview('https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg');
        });

    const history = useHistory();

    // TODO Get all the posts from the DB for the current user
    const data = [
        {
            id: 1,
            username: 'johnsmith123',
            image: 'https://cdn.lifehack.org/wp-content/uploads/2018/03/workout-routines-for-men-1024x768.jpeg',
            date: '2022-03-13 12:45pm',
            description: 'This is me working out!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very nice!',
                },
            ],
        },
        {
            id: 2,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
        {
            id: 3,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
        {
            id: 4,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
        {
            id: 5,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
    ];

    const handleEditProfileClick = () => {
        history.push('/user/editprofile');
    };

    return (
        <div className='profile-container'>
            <div className='card-container'>
                <div className='upper-card-container'>
                    {imagePreview ? (
                        <img className='profile-avatar-image' src={imagePreview} alt='avatar' />
                    ) : (
                        <div className='profile-avatar-loading'>
                            <PulseLoader size={20} margin={7} color={'var(--button-blue)'} loading={true} />
                        </div>
                    )}

                    <div className='profile-header'>{currentUser.displayName}</div>
                    <div className='profile-edit-button'>
                        <Button
                            onClick={handleEditProfileClick}
                            style={{
                                textTransform: 'none',
                                borderRadius: '500px',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#f4f4f4',
                                color: 'black',
                                fontFamily: 'Spartan-B',
                                fontSize: '1rem',
                            }}
                            variant='contained'>
                            Edit Profile
                        </Button>
                    </div>
                </div>
                <hr style={{ width: '100%', margin: '2rem 0' }} />
                <div className='profile-posts-container'>
                    {data.map((post) => {
                        return <ProfilePosts key={post.id} image={post.image} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Profile;
