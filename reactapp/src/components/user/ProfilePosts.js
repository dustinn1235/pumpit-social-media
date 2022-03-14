import React from 'react';

const ProfilePosts = ({ image }) => {
    return (
        <div>
            <img className='profile-post-image' src={image} alt='post' />
        </div>
    );
};

export default ProfilePosts;
