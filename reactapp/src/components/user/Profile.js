import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import ProfilePosts from './ProfilePosts';

const Profile = () => {
    const { user } = useContext(AppContext);
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
        {
            id: 3,
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
        {
            id: 4,
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
        {
            id: 5,
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
        <div className='profile-container'>
            <div className='profile-header'>{user.username}</div>
            <div className='profile-posts-container'>
                {data.map((post) => {
                    return <ProfilePosts key={post.id} image={post.image} />;
                })}
            </div>
        </div>
    );
};

export default Profile;
