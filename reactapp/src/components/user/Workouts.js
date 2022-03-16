import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Workouts = () => {
    const muscleGroups = ['Chest', 'Back', 'Biceps', 'Triceps', 'Shoulders', 'Quads', 'Hamstrings', 'Calfs', 'Glutes'];

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

    let validSelection = chestBool || backBool || bicepsBool || tricepsBool || shouldersBool || quadsBool || hamstringsBool || calfsBool || glutesBool;

    const generateWorkouts = () => {
        setShowWorkouts(true);
    };

    return (
        <div className='workout-container'>
            <div className='card-container'>
                {showWorkouts ? (
                    <></>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Workouts;
