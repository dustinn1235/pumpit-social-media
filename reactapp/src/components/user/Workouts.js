import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Workouts = () => {
    // Different types of muscles
    const muscleGroups = ['Chest', 'Back', 'Biceps', 'Triceps', 'Shoulders', 'Quads', 'Hamstrings', 'Calfs', 'Glutes'];

    // Different Types of Workouts per each muscle group
    const chestWorkouts = ['Incline Push Up', 'Flat Bench Press', 'Incline Bench Press', 'Decline Bench Press', 'Pushup', 'Cable Crossover', 'Chest Dip'];
    const backWorkouts = [
        'Deadlift',
        'Bent-Over Row',
        'Pull-Up',
        'T-Bar Row',
        'Seated Row',
        'Lat Pull-Down',
        'Single-Arm Dumbbell Row',
        'Chest-Supported Row',
        'Dumbbell Pull-Over',
        'Single-Arm Smith Machine Row',
    ];
    const bicepWorkouts = [
        'Standing Dumbbell Curl',
        'Hammer Curl',
        'Incline Dumbbell Curl',
        'Zottman Curl',
        'Barbell Bent-Over Row',
        'Chin-Up',
        'Regular EZ Bar Curl',
        'Underhand Seated Row',
        'Reverse Curl Straight Bar',
        'Concentration Curl',
        'Twisting Dumbbell Curl',
        'Prone Dumbbell Spider Curl',
        'Leant-Forward EZ Bar Curl',
        'Inverted Row',
        'Meadows Row',
    ];
    const tricepWorkouts = [
        'Diamond Push-Ups',
        'Kickbacks',
        'Dips',
        'Overhead Triceps Extensions',
        'Rope Pushdowns',
        'Bar Pushdowns',
        'Lying Triceps Extensions',
        'Close Grip Bench Presses',
    ];
    const shoulderWorkouts = ['Pushups', 'Incline Bench Press', 'Lateral Raise', 'Overhead Press', 'Standing Cable Pulley Fly', 'Crab Walk', 'Pront T', 'Dumbbell Shoulder Press'];
    const quadWorkouts = [
        'Heel-Elevated Back Squat',
        'Front-Foot-Elevated Dumbbell Split Squat',
        'Hack Squat',
        'Heel-Elevated Trap Bar Deadlift',
        'Leg Press',
        'Low Cable Split Squat',
        'Banded Sissy Squat',
        'Leg Extension',
        'Prowler Pull',
        'Cyclist Squat',
    ];
    const hamstringWorkouts = [
        'Deadlift',
        'Romanian Deadlift',
        'Single-Leg Deadlift',
        'Hex-Bar Deadlift',
        'Glute Bridge',
        'Barbell Hip Thrust',
        'Swiss Ball Leg Curl',
        'Kettlebell Swing',
        'Glute Ham Raise',
        'Reverse Sled Pulls',
        'Machine Leg Curl',
        'Cardio Row',
    ];
    const calfWorkouts = [
        'Standing Calf Raise',
        'Standing Calf Raise on Elevated Surface',
        'Seated Calf Raise',
        'Farmer’s Walk on Toes',
        'Jump Rope',
        'Dumbbell Jump Squat',
        'Plyo Lunge',
    ];
    const gluteWorkouts = [
        'Conventional Deadlift',
        'Back Squat',
        'Glute Bridge',
        'Belt Squats',
        'Banded Romanian Deadlift',
        'Rear Foot Elevated Split Squat',
        'Sumo Deadlift',
        'Modified Curtsy Lunge',
        'Walking Lunge',
        'Cable Glute Kickback',
        'Step Downs',
        'Smith Machine Reverse Lunge',
        'Lateral Lunge',
        'Goblet Squat',
    ];

    // Boolean to Show the UI for the generated workouts
    const [showWorkouts, setShowWorkouts] = useState(false);

    // Stat variables for the check boxes
    const [chestBool, setChestBool] = useState(false);
    const [backBool, setBackBool] = useState(false);
    const [bicepsBool, setBicepsBool] = useState(false);
    const [tricepsBool, setTricepsBool] = useState(false);
    const [shouldersBool, setShouldersBool] = useState(false);
    const [quadsBool, setQuadsBool] = useState(false);
    const [hamstringsBool, setHamstringsBool] = useState(false);
    const [calfsBool, setCalfsBool] = useState(false);
    const [glutesBool, setGlutesBool] = useState(false);

    // Toggle the muscle button that was clicked
    const handleMuscleClick = (muscleType) => {
        if (muscleType === 'Chest') {
            setChestBool(!chestBool);
        } else if (muscleType === 'Back') {
            setBackBool(!backBool);
        } else if (muscleType === 'Biceps') {
            setBicepsBool(!bicepsBool);
        } else if (muscleType === 'Triceps') {
            setTricepsBool(!tricepsBool);
        } else if (muscleType === 'Shoulders') {
            setShouldersBool(!shouldersBool);
        } else if (muscleType === 'Quads') {
            setQuadsBool(!quadsBool);
        } else if (muscleType === 'Hamstrings') {
            setHamstringsBool(!hamstringsBool);
        } else if (muscleType === 'Calfs') {
            setCalfsBool(!calfsBool);
        } else if (muscleType === 'Glutes') {
            setGlutesBool(!glutesBool);
        }
    };

    // Get the boolean if the button has been toggled on or off
    const getMuscleBool = (muscleType) => {
        if (muscleType === 'Chest') {
            return chestBool;
        } else if (muscleType === 'Back') {
            return backBool;
        } else if (muscleType === 'Biceps') {
            return bicepsBool;
        } else if (muscleType === 'Triceps') {
            return tricepsBool;
        } else if (muscleType === 'Shoulders') {
            return shouldersBool;
        } else if (muscleType === 'Quads') {
            return quadsBool;
        } else if (muscleType === 'Hamstrings') {
            return hamstringsBool;
        } else if (muscleType === 'Calfs') {
            return calfsBool;
        } else if (muscleType === 'Glutes') {
            return glutesBool;
        }
    };

    // Only allow the generate workouts button to be enabled when at least one muscle group has been selected
    let validSelection = chestBool || backBool || bicepsBool || tricepsBool || shouldersBool || quadsBool || hamstringsBool || calfsBool || glutesBool;

    // Show the generated workouts UI
    const generateWorkouts = () => {
        setShowWorkouts(true);
    };

    // When showing the workouts UI, pick a workout at random
    const getWorkout = (muscleType) => {
        if (muscleType === 'Chest') {
            let index = Math.floor(Math.random() * chestWorkouts.length);
            return chestWorkouts[index];
        } else if (muscleType === 'Back') {
            let index = Math.floor(Math.random() * backWorkouts.length);
            return backWorkouts[index];
        } else if (muscleType === 'Biceps') {
            let index = Math.floor(Math.random() * bicepWorkouts.length);
            return bicepWorkouts[index];
        } else if (muscleType === 'Triceps') {
            let index = Math.floor(Math.random() * tricepWorkouts.length);
            return tricepWorkouts[index];
        } else if (muscleType === 'Shoulders') {
            let index = Math.floor(Math.random() * shoulderWorkouts.length);
            return shoulderWorkouts[index];
        } else if (muscleType === 'Quads') {
            let index = Math.floor(Math.random() * quadWorkouts.length);
            return quadWorkouts[index];
        } else if (muscleType === 'Hamstrings') {
            let index = Math.floor(Math.random() * hamstringWorkouts.length);
            return hamstringWorkouts[index];
        } else if (muscleType === 'Calfs') {
            let index = Math.floor(Math.random() * calfWorkouts.length);
            return calfWorkouts[index];
        } else if (muscleType === 'Glutes') {
            let index = Math.floor(Math.random() * gluteWorkouts.length);
            return gluteWorkouts[index];
        }
    };

    return (
        <div className='workout-container'>
            {showWorkouts ? (
                <div className='show-workouts-container'>
                    <div style={{ marginBottom: '3rem' }} className='show-workout-top'>
                        <div className='show-workouts-header'>My Workouts Today</div>
                        <div className='show-workouts-header2'>
                            Each workout has a description, the number of suggested repititions and sets, and images or videos for demonstration purposes
                        </div>
                    </div>
                    <div className='workouts-grid'>
                        {chestBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Chest</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Chest')}</div>
                                </div>
                            </div>
                        ) : null}
                        {backBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Back</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Back')}</div>
                                </div>
                            </div>
                        ) : null}
                        {bicepsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Biceps</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Biceps')}</div>
                                </div>
                            </div>
                        ) : null}
                        {tricepsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Triceps</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Triceps')}</div>
                                </div>
                            </div>
                        ) : null}
                        {shouldersBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Shoulders</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Shoulders')}</div>
                                </div>
                            </div>
                        ) : null}
                        {quadsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Quads</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Quads')}</div>
                                </div>
                            </div>
                        ) : null}
                        {hamstringsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Hamstrings</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Hamstrings')}</div>
                                </div>
                            </div>
                        ) : null}
                        {calfsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Calfs</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Calfs')}</div>
                                </div>
                            </div>
                        ) : null}
                        {glutesBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-content'>
                                    <div className='show-workouts-subheader'>Glutes</div>
                                    <div className='show-workouts-chosen'>{getWorkout('Glutes')}</div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div className='card-container'>
                    <div className='workout-header'>Workouts</div>
                    <div className='workout-helper-text'>Select the muscle groups you want to work out</div>
                    <div className='check-box-container'>
                        {muscleGroups.map((muscle) => {
                            return (
                                <Button
                                    onClick={() => {
                                        handleMuscleClick(muscle);
                                    }}
                                    style={{
                                        textTransform: 'none',
                                        borderRadius: '500px',
                                        padding: '0.5rem 1rem',
                                        backgroundColor: getMuscleBool(muscle) ? 'var(--button-blue)' : '#f4f4f4',
                                        color: getMuscleBool(muscle) ? 'white' : 'black',
                                        fontFamily: 'Spartan-B',
                                        fontSize: '1rem',
                                    }}
                                    variant='contained'>
                                    {muscle}
                                </Button>
                            );
                        })}
                    </div>
                    <div className='generate-workouts-button'>
                        <Button
                            disabled={validSelection ? false : true}
                            onClick={generateWorkouts}
                            style={{
                                textTransform: 'none',
                                borderRadius: '500px',
                                padding: '0.5rem 1rem',
                                backgroundColor: validSelection ? 'green' : 'gainsboro',
                                color: 'whitesmoke',
                                fontFamily: 'Spartan-B',
                                fontSize: '1rem',
                            }}
                            variant='contained'>
                            Generate Workouts
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Workouts;
