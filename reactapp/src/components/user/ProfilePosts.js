import React, { useState } from 'react';
import { storage } from '../../firebase';

const ProfilePosts = ({ image }) => {
    const [postImagePreview, setPostImagePreview] = useState('');

    storage
        .ref(`images/`)
        .child(`${image}`)
        .getDownloadURL()
        .then((url) => {
            setPostImagePreview(url);
        })
        .catch((e) => {
            console.log('Errors while downloading => ', e);
            setPostImagePreview('https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg');
        });
    return (
        <div>
            {postImagePreview ? (
                <img className='profile-post-image' src={postImagePreview} alt='post' />
            ) : (
                <img className='profile-post-image' src={'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif'} alt='post' />
            )}
        </div>
    );
};

export default ProfilePosts;
