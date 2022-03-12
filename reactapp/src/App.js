import './styles.css';
import AppState from './context/AppState';

// Components
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// Routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <AppState>
            <Router>
                <Navbar />
                {/* This div is needed to add a height to the fixed Navbar above */}
                <div style={{ height: '64px' }} />
                <div id='page-container'>
                    <Routes>
                        <Route path='/' exact element={<LandingPage />} />
                        <Route path='/signin' exact element={<SignIn />} />
                        <Route path='/signup' exact element={<SignUp />} />
                    </Routes>
                </div>
            </Router>
        </AppState>
    );
}

export default App;
