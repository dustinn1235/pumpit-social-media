import React from 'react';
import Posts from './Posts';

const Home = () => {
    const data = [
        {
            id: 1,
            username: 'johnsmith123',
            image: 'https://cdn.lifehack.org/wp-content/uploads/2018/03/workout-routines-for-men-1024x768.jpeg',
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
        {
            id: 1,
            username: 'dougjones123',
            image: 'https://manofmany.com/wp-content/uploads/2020/05/7-minute-workout.jpg',
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
            {data.map((post) => {
                return <Posts id={post.id} username={post.username} image={post.image} comments={post.comments} />;
            })}
        </div>
    );
};

export default Home;
