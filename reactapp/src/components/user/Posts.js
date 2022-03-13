import React from 'react';

const Posts = ({ id, username, image, comments }) => {
    return (
        <div className='post-container'>
            <div>{id}</div>
            <div>{username}</div>
            <img src={image} alt='workout' />
            {/* <div>{comments}</div> */}
        </div>
    );
};

export default Posts;
