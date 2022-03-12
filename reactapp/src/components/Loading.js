import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

export const Loading = (props) => {
    // from: https://github.com/davidhu2000/react-spinners

    const color = 'rgb(28, 77, 255)';
    const loading = true;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '2rem',
            }}>
            <span style={{ marginTop: '0.25rem' }}>
                <ScaleLoader height={25} width={2} margin={3} color={color} loading={loading} />
            </span>
            <span style={{ marginLeft: '1rem', fontFamily: 'Roboto', fontSize: '2rem' }}>Loading...</span>
        </div>
    );
};

export default Loading;
