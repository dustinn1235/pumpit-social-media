import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { db } from '../../firebase';

const Workouts = () => {
    // TODO Need to get images/videos to support each different workout
    // TODO Need to get descriptions for each workout.
    // const [muscleCols, setMuscleCols] = useState({});

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

    // State variable for exercises
    const [chestEx, setChestEx] = useState({});
    const [backEx, setBackEx] = useState({});
    const [bicepEx, setBicepEx] = useState({});
    const [tricepEx, setTricepEx] = useState({});
    const [shoulderEx, setShoulderEx] = useState({});
    const [quadEx, setQuadEx] = useState({});
    const [hamstringEx, setHamstringEx] = useState({});
    const [calfEx, setCalfEx] = useState({});
    const [gluteEx, setGluteEx] = useState({});

    let musclesCollection = {};
    const getData = async () => {
        await db
            .collection('muscles')
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    musclesCollection[doc.id] = doc.data();
                });
            });
    };

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
    const generateWorkouts = async () => {
        setShowWorkouts(true);
        await getData();

        let index;
        if (chestBool) {
            index = getWorkout('Chest');
            setChestEx(musclesCollection['chest']['workouts'][index]);
            console.log(musclesCollection['chest']['workouts'][index].vidURL);
        }
        if (backBool) {
            index = getWorkout('Back');
            setBackEx(musclesCollection['back']['workouts'][index]);
        }
        if (bicepsBool) {
            index = getWorkout('Biceps');
            setBicepEx(musclesCollection['bicep']['workouts'][index]);
        }
        if (tricepsBool) {
            index = getWorkout('Triceps');
            setTricepEx(musclesCollection['tricep']['workouts'][index]);
        }
        if (shouldersBool) {
            index = getWorkout('Shoulders');
            setShoulderEx(musclesCollection['shoulder']['workouts'][index]);
        }
        if (quadsBool) {
            index = getWorkout('Quads');
            setQuadEx(musclesCollection['quad']['workouts'][index]);
        }
        if (hamstringsBool) {
            index = getWorkout('Hamstrings');
            setHamstringEx(musclesCollection['hamstring']['workouts'][index]);
        }
        if (calfsBool) {
            index = getWorkout('Calfs');
            setCalfEx(musclesCollection['calf']['workouts'][index]);
        }
        if (glutesBool) {
            index = getWorkout('Glutes');
            setGluteEx(musclesCollection['glute']['workouts'][index]);
        }
    };

    // When showing the workouts UI, pick a workout at random
    const getWorkout = (muscleType) => {
        let index = 0;

        if (muscleType === 'Chest') {
            index = Math.floor(Math.random() * chestWorkouts.length);
        } else if (muscleType === 'Back') {
            index = Math.floor(Math.random() * backWorkouts.length);
        } else if (muscleType === 'Biceps') {
            index = Math.floor(Math.random() * bicepWorkouts.length);
        } else if (muscleType === 'Triceps') {
            index = Math.floor(Math.random() * tricepWorkouts.length);
        } else if (muscleType === 'Shoulders') {
            index = Math.floor(Math.random() * shoulderWorkouts.length);
        } else if (muscleType === 'Quads') {
            index = Math.floor(Math.random() * quadWorkouts.length);
        } else if (muscleType === 'Hamstrings') {
            index = Math.floor(Math.random() * hamstringWorkouts.length);
        } else if (muscleType === 'Calfs') {
            index = Math.floor(Math.random() * calfWorkouts.length);
        } else if (muscleType === 'Glutes') {
            index = Math.floor(Math.random() * gluteWorkouts.length);
        }
        return index;
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
                                <div className='show-workouts-subheader'>Chest</div>
                                <div className='show-workouts-chosen'>{chestEx.name}</div>
                                <div className='show-workouts-descr'>{chestEx.descr}</div>
                                <iframe title='Chest Tut' src={chestEx.vidURL} />
                            </div>
                        ) : null}
                        {backBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-subheader'>Back</div>
                                <div className='show-workouts-chosen'>{backEx.name}</div>
                                <div className='show-workouts-descr'>{backEx.descr}</div>
                                <iframe title='Back Tut' src={backEx.vidURL} />
                            </div>
                        ) : null}
                        {bicepsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-subheader'>Biceps</div>
                                <div className='show-workouts-chosen'>{bicepEx.name}</div>
                                <div className='show-workouts-descr'>{bicepEx.descr}</div>
                                <iframe title='Bicep Tut' src={bicepEx.vidURL} />
                            </div>
                        ) : null}
                        {tricepsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-subheader'>Triceps</div>
                                <div className='show-workouts-chosen'>{tricepEx.name}</div>
                                <div className='show-workouts-descr'>{tricepEx.descr}</div>
                                <iframe title='Tricep Tut' src={tricepEx.vidURL} />
                            </div>
                        ) : null}
                        {shouldersBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-subheader'>Shoulders</div>
                                <div className='show-workouts-chosen'>{shoulderEx.name}</div>
                                <div className='show-workouts-descr'>{shoulderEx.descr}</div>
                                <iframe title='Shoulder Tut' src={shoulderEx.vidURL} />
                            </div>
                        ) : null}
                        {quadsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-subheader'>Quads</div>
                                <div className='show-workouts-chosen'>{quadEx.name}</div>
                                <div className='show-workouts-descr'>{quadEx.descr}</div>
                                <iframe title='Quad Tut' src={quadEx.vidURL} />
                            </div>
                        ) : null}
                        {hamstringsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-subheader'>Hamstrings</div>
                                <div className='show-workouts-chosen'>{hamstringEx.name}</div>
                                <div className='show-workouts-descr'>{hamstringEx.descr}</div>
                                <iframe title='Hamstring Tut' src={hamstringEx.vidURL} />
                            </div>
                        ) : null}
                        {calfsBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-subheader'>Calfs</div>
                                <div className='show-workouts-chosen'>{calfEx.name}</div>
                                <div className='show-workouts-descr'>{calfEx.descr}</div>
                                <iframe title='Calf Tut' src={calfEx.vidURL} />
                            </div>
                        ) : null}
                        {glutesBool ? (
                            <div className='workout-content-card'>
                                <div className='show-workouts-subheader'>Glutes</div>
                                <div className='show-workouts-chosen'>{gluteEx.name}</div>
                                <div className='show-workouts-descr'>{gluteEx.descr}</div>
                                <iframe title='Glute Tut' src={gluteEx.vidURL} />
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div className='card-container'>
                    <div className='workout-header' style={{ color: 'var(--button-blue)' }}>
                        Workouts
                    </div>
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
