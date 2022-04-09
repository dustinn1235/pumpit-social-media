import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import firebase from '../../firebase'
import { useAuth } from '../../context/AuthContext';
import { PopperUnstyled } from '@mui/material';

const Home = () => {
    const { currentUser } = useAuth();
    // TODO Get this data from the DB
    const [posts, setPosts] = useState([]);
    const postsRef = firebase.firestore().collection('posts');
    console.log(posts);
    // Implement a useEffect for the DB call
    useEffect(() => 
            postsRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({...doc.data(), id:doc.id});
                });
                if(JSON.stringify(items) !== JSON.stringify(posts)){
                    setPosts(items);
                }
            })
    , [postsRef, posts]);

    const data = [
        {
            id: 1,
            username: 'johnsmith123',
            image: 'https://cdn.lifehack.org/wp-content/uploads/2018/03/workout-routines-for-men-1024x768.jpeg',
            date: '2022-03-13 12:45pm',
            description: 'This is me working out!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very nice!',
                },
            ],
        },
        {
            id: 2,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
            date: '2022-03-13 12:30pm',
            description: 'This is me running!',
            comments: [
                {
                    username: 'maryjane123',
                    comment: 'Wow nice job!',
                },
                {
                    username: 'dougjones123',
                    comment: 'Very cool!',
                },
            ],
        },
    ];
    return (
        <div className='home-container'>
            {posts.map((post) => {
                return <Posts key={post.id} id={post.id} username={post.username} image={post.imgName} date={post.time} description={post.description} comments={post.postComments} likes={post.postLikes}/>;
            })}
        </div>
    );
};

export default Home;
