import { useEffect } from 'react';
import Bench from '../images/bench.png';
import Curl from '../images/curl.png';
import Run from '../images/run.png';
import Rope from '../images/rope.png';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const history = useHistory();
    const images = [Bench, Curl, Rope, Run];

    const { currentUser } = useAuth();

    const handleStartSharingClick = () => {
        history.push('/signup');
    };

    useEffect(() => {
        if (currentUser !== null) {
            history.push('/user/home');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='landing-page-container'>
            <div>
                {/* <div className='landing-page-header' style={{ color: '#193359', margin: '0px' }}>
                    Workout,
                </div> */}
                <div className='landing-page-header'>
                    <span style={{ color: '#193359' }}>Workout, </span>and start sharing daily!
                </div>
                <div className='landing-page-subheader'>Get daily workout goals and compare your results against others.</div>
                <button onClick={handleStartSharingClick} className='landing-page-button'>
                    JOIN NOW
                </button>
            </div>
            <img className='landing-page-image fade-in' src={images[0]} alt='workout' />
        </div>
    );
};

export default LandingPage;
