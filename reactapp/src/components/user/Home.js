import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import firebase from '../../firebase';

const Home = () => {
    const [posts, setPosts] = useState([]);
    // Implement a useEffect for the DB call
    useEffect(() => {
        const postsRef = firebase.firestore().collection('posts');
        postsRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id });
            });
            if (JSON.stringify(items) !== JSON.stringify(posts)) {
                let newestToOldest = items.sort((a, b) => new Date(b.time) - new Date(a.time));
                setPosts(newestToOldest);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
