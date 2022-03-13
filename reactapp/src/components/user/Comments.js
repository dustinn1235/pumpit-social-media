import React from 'react';

const Comments = ({ username, comment }) => {
    return (
        <div className='description-container'>
            <span className='description-username'>{username}</span>
            <span>{comment}</span>
        </div>
    );
};

export default Comments;
