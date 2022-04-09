import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import firebase from '../../firebase';

const Home = () => {
    // TODO Get this data from the DB
    const [posts, setPosts] = useState([]);
    const postsRef = firebase.firestore().collection('posts');
    // Implement a useEffect for the DB call
    useEffect(
        () =>
            postsRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ ...doc.data(), id: doc.id });
                });
                setPosts(items);
            }),
        [postsRef],
    );

    return (
        <div className='home-container'>
            {posts.map((post) => {
                return (
                    <Posts
                        key={post.id}
                        id={post.id}
                        username={post.username}
                        image={post.imgName}
                        date={post.time}
                        description={post.description}
                        comments={post.postComments}
                        likes={post.postLikes}
                        reps={post.reps}
                        sets={post.sets}
                        workout={post.workoutType}
                    />
                );
            })}
        </div>
    );
};

export default Home;
