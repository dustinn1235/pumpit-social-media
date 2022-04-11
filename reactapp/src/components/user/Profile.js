import React, { useState, useEffect } from 'react';
import ProfilePosts from './ProfilePosts';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../firebase';
import firebase from '../../firebase';
import PulseLoader from 'react-spinners/PulseLoader';

const Profile = () => {
    const { currentUser } = useAuth();

    const [posts, setPosts] = useState([]);
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

    // Implement a useEffect for the DB call
    useEffect(() => {
        const postsRef = firebase.firestore().collection('posts');
        postsRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().username === currentUser.displayName) {
                    items.push({ ...doc.data(), id: doc.id });
                }
            });
            if (JSON.stringify(items) !== JSON.stringify(posts)) {
                let newestToOldest = items.sort((a, b) => new Date(b.time) - new Date(a.time));
                setPosts(newestToOldest);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const history = useHistory();

    const handleEditProfileClick = () => {
        history.push('/user/editprofile');
    };

    return (
        <div className='profile-container'>
            <div className='card-container profile-card-container'>
                <div className='upper-card-container'>
                    {imagePreview ? (
                        <img className='profile-avatar-image' src={imagePreview} alt='avatar' />
                    ) : (
                        <div className='profile-avatar-loading'>
                            <PulseLoader size={19} margin={7} color={'var(--button-blue)'} loading={true} />
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
                {posts.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem auto' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>You don't have any posts yet</div>
                        <Button
                            onClick={handleEditProfileClick}
                            style={{
                                textTransform: 'none',
                                borderRadius: '500px',
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--button-blue)',
                                color: 'white',
                                fontFamily: 'Spartan-B',
                                fontSize: '1rem',
                            }}
                            variant='contained'>
                            Upload Here
                        </Button>
                    </div>
                ) : (
                    <div className='profile-posts-container'>
                        {posts.map((post) => {
                            return <ProfilePosts key={post.id} image={post.imgName} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
