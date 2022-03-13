import React, { useState } from 'react';
import HeartFilled from '@mui/icons-material/Favorite';
import HeartOutlined from '@mui/icons-material/FavoriteBorder';
import Comment from '@mui/icons-material/ModeCommentOutlined';
import Comments from './Comments';

const Posts = ({ id, username, image, date, description, comments }) => {
    const [like, setLike] = useState(false);
    const [viewComments, setViewComments] = useState(false);
    const [commentValue, setCommentValue] = useState('');

    const handleLikeClick = () => {
        if (like === false) {
            setLike(true);
        } else {
            setLike(false);
        }
    };

    return (
        <div className='post-container'>
            <div className='post-header'>
                <div className='post-header-username'>{username}</div>
                <div className='post-header-date'>{date}</div>
            </div>

            <img className='post-image' src={image} alt='workout' />
            <div>
                <div className='footer-no-comment-input'>
                    {like ? (
                        <HeartFilled className='like-icon' onClick={handleLikeClick} style={{ color: 'red' }} />
                    ) : (
                        <HeartOutlined className='like-icon' onClick={handleLikeClick} />
                    )}
                    <div className='description-container'>
                        <span className='description-username'>{username}</span>
                        <span>{description}</span>
                    </div>
                    {comments === [] ? null : (
                        <>
                            {viewComments ? (
                                <div className='comment-container'>
                                    {comments.map((post) => {
                                        return <Comments username={post.username} comment={post.comment} />;
                                    })}
                                    <div
                                        onClick={() => {
                                            setViewComments(false);
                                        }}
                                        className='comment-view-container'>
                                        Hide all comments
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setViewComments(true);
                                    }}
                                    className='comment-view-container'>
                                    View all {comments.length} comments
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className='comment-input-container'>
                    <div>
                        <Comment style={{ marginRight: '1rem' }} />
                        <input
                            className='comment-input'
                            placeholder='Add a comment...'
                            value={commentValue}
                            onChange={(e) => {
                                setCommentValue(e.target.value);
                            }}
                        />
                    </div>
                    <button>Post</button>
                </div>
            </div>
        </div>
    );
};

export default Posts;
