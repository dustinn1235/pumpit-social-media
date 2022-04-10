import React, { useState } from 'react';
import HeartFilled from '@mui/icons-material/Favorite';
import HeartOutlined from '@mui/icons-material/FavoriteBorder';
import Comment from '@mui/icons-material/ModeCommentOutlined';
import Comments from './Comments';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../firebase';
import PulseLoader from 'react-spinners/PulseLoader';
import firebase from '../../firebase';
import moment from 'moment';

const Posts = ({ id, username, image, date, description, comments, likes, reps, sets, workout }) => {
    const { currentUser } = useAuth();
    const [like, setLike] = useState(likes.includes(currentUser.uid));
    const [commentValue, setCommentValue] = useState('');
    const [showMyComments, setShowMyComments] = useState(false);

    const [imagePreview, setImagePreview] = useState('');
    const [postImagePreview, setPostImagePreview] = useState('');

    storage
        .ref(`profile/${username}`)
        .child('avatar.png')
        .getDownloadURL()
        .then((url) => {
            setImagePreview(url);
        })
        .catch((e) => {
            console.log('Errors while downloading => ', e);
            setImagePreview('https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg');
        });

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

    const handleLikeClick = () => {
        // TODO Make a call to the DB to update the like boolean
        if (like === false) {
            firebase
                .firestore()
                .collection('posts')
                .doc(id)
                .update({ postLikes: [...likes, currentUser.uid] });
            setLike(true);
        } else {
            const newLikesList = likes.filter((item) => item !== currentUser.uid);
            firebase
                .firestore()
                .collection('posts')
                .doc(id)
                .update({ postLikes: [...newLikesList] });
            setLike(false);
        }
    };

    // Function for posting a comment
    const handlePostClick = async () => {
        firebase
            .firestore()
            .collection('posts')
            .doc(id)
            .update({ postComments: [...comments, { username: currentUser && currentUser.displayName, text: commentValue }] });

        // Displays comments that the current user has just made right away
        setShowMyComments(true);

        // Make a call to the DB to get all the comments on that post
        // getAllComments();

        // Empty out the comment text field
        setCommentValue('');
    };

    return (
        <div className='post-container'>
            <div className='post-header'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {imagePreview ? (
                        <img className='post-header-image' src={imagePreview} alt='avatar' />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', height: '35px' }}>
                            <PulseLoader size={8} margin={2} color={'var(--button-blue)'} loading={true} />
                        </div>
                    )}

                    <div className='post-header-username'>{username}</div>
                </div>
                <div className='post-header-date'>{moment(date).format('YYYY-MM-DD, h:mm a')}</div>
            </div>
            {postImagePreview ? (
                <img className='post-image' src={postImagePreview} alt='workout' />
            ) : (
                <div className='post-image' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', flexDirection: 'column' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ fontSize: '1.5rem', fontFamily: 'Spartan-B', marginRight: '0.5rem' }}>Loading image</div>
                        <PulseLoader size={20} margin={4} color={'var(--button-blue)'} loading={true} />
                    </div>
                    <div style={{ marginTop: '1rem' }}>If loading is taking longer then expected,</div>
                    <div>please refresh the page</div>
                </div>
            )}
            <div>
                <div className='footer-no-comment-input'>
                    {like ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <HeartFilled className='like-icon' onClick={handleLikeClick} style={{ color: 'red' }} />
                            {likes.length === 1 ? <p style={{ marginLeft: '0.5rem' }}>{likes.length} like</p> : <p style={{ marginLeft: '0.5rem' }}>{likes.length} likes</p>}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <HeartOutlined className='like-icon' onClick={handleLikeClick} />
                            {likes.length === 1 ? <p style={{ marginLeft: '0.5rem' }}>{likes.length} like</p> : <p style={{ marginLeft: '0.5rem' }}>{likes.length} likes</p>}
                        </div>
                    )}
                    <div className='description-container'>
                        <span className='description-username'>{username}</span>
                        <span>{description}</span>
                        {sets === '1' ? (
                            <span className='description-sets-reps'>
                                {workout.charAt(0).toUpperCase() + workout.slice(1)}, {sets} set of {reps}
                            </span>
                        ) : (
                            <span className='description-sets-reps'>
                                {workout.charAt(0).toUpperCase() + workout.slice(1)}, {sets} sets of {reps}
                            </span>
                        )}
                    </div>
                    {showMyComments ? (
                        <div className='comment-container'>
                            {comments.map((post) => {
                                return <Comments username={post.username} comment={post.text} />;
                            })}
                            <div
                                onClick={() => {
                                    setShowMyComments(false);
                                }}
                                className='comment-view-container'>
                                Hide all comments
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => {
                                setShowMyComments(true);
                            }}
                            className='comment-view-container'>
                            View all {comments.length} comments
                        </div>
                    )}
                </div>
                <div className='comment-input-container'>
                    <div style={{ display: 'flex' }}>
                        <Comment style={{ marginRight: '1rem' }} />
                        <input
                            style={{ backgroundColor: '#f4faff' }}
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
