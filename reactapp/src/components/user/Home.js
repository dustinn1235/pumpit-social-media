import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import firebase from '../../firebase';

const Home = () => {

    const { currentUser } = useAuth();
    const [posts, setPosts] = useState([]);
    console.log(posts);
    // Implement a useEffect for the DB call
    useEffect(() => {
        const postsRef = firebase.firestore().collection('posts');
        postsRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({...doc.data(), id:doc.id});
            });
            if(JSON.stringify(items) !== JSON.stringify(posts)){
                setPosts(items);
            }
        })
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
