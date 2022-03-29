import Bench from '../images/bench.png';
import Curl from '../images/curl.png';
import Run from '../images/run.png';
import Rope from '../images/rope.png';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const history = useHistory();
    const images = [Bench, Curl, Rope, Run];

    const handleStartSharingClick = () => {
        history.push('/signin');
    };

    return (
        <div className='landing-page-container'>
            <div>
                <div className='landing-page-header'>Workout, and start sharing daily!</div>
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
