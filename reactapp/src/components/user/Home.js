import React from 'react';
import Posts from './Posts';

const Home = () => {
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
            {data.map((post) => {
                return <Posts key={post.id} id={post.id} username={post.username} image={post.image} date={post.date} description={post.description} comments={post.comments} />;
            })}
        </div>
    );
};

export default Home;
