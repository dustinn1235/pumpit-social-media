import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import HeartFilled from '@mui/icons-material/Favorite';
import HeartOutlined from '@mui/icons-material/FavoriteBorder';
import Comment from '@mui/icons-material/ModeCommentOutlined';
import Comments from './Comments';
import Button from '@mui/material/Button';

const Posts = ({ id, username, image, date, description, comments }) => {
    const { user } = useContext(AppContext);
    const [like, setLike] = useState(false);
    const [viewComments, setViewComments] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [myComments, setMyComments] = useState([]);
    const [showMyComments, setShowMyComments] = useState(false);
    const [allComments, setAllComments] = useState(comments);

    const handleLikeClick = () => {
        // TODO Make a call to the DB to update the like boolean
        if (like === false) {
            setLike(true);
        } else {
            setLike(false);
        }
    };

    // Function for loading in all the comments
    const getAllComments = () => {
        // TODO Make a call to the DB to get all comments that match the post id (id is passed as argument)
        // setAllComments(responseFromDB)
    };

    // Function for posting a comment
    const handlePostClick = () => {
        // TODO send post information to DB (username, comment)

        // Displays comments that the current user has just made right away
        setMyComments([...myComments, { username: user.username, comment: commentValue }]);
        setShowMyComments(true);

        // Make a call to the DB to get all the comments on that post
        getAllComments();

        // Empty out the comment text field
        setCommentValue('');
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
                    {allComments === [] ? null : (
                        <>
                            {viewComments ? (
                                <div className='comment-container'>
                                    {allComments.map((post) => {
                                        return <Comments username={post.username} comment={post.comment} />;
                                    })}
                                    <div
                                        onClick={() => {
                                            setViewComments(false);
                                            setShowMyComments(true);
                                        }}
                                        className='comment-view-container'>
                                        Hide all comments
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setViewComments(true);
                                        setShowMyComments(false);
                                    }}
                                    className='comment-view-container'>
                                    View all {allComments.length} comments
                                </div>
                            )}
                        </>
                    )}
                    {showMyComments ? (
                        <>
                            {myComments !== [] ? (
                                <>
                                    {myComments.map((post) => {
                                        return <Comments username={post.username} comment={post.comment} />;
                                    })}
                                </>
                            ) : null}
                        </>
                    ) : null}
                </div>
                <div className='comment-input-container'>
                    <div style={{ display: 'flex' }}>
                        <Comment style={{ marginRight: '1rem' }} />
                        <input
                            className='comment-input'
                            placeholder='Add a comment...'
                            onKeyPress={(e) => e.key === 'Enter' && handlePostClick()}
                            value={commentValue}
                            onChange={(e) => {
                                setCommentValue(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        disabled={commentValue !== '' ? false : true}
                        onClick={handlePostClick}
                        style={{
                            textTransform: 'none',
                            borderRadius: '500px',
                            padding: '0.25rem 0.5rem',
                            backgroundColor: commentValue !== '' ? 'var(--button-blue)' : 'gray',
                            color: commentValue !== '' ? 'white' : '#DCDCDC',
                            fontFamily: 'Spartan-R',
                            fontSize: '1rem',
                        }}
                        variant='contained'>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Posts;
