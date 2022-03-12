import './styles.css';
import AppState from './context/AppState';

// Components
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

// Routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <AppState>
            <Router>
                <Navbar />
                <div id='page-container'>
                    <Routes>
                        <Route path='/' exact element={<LandingPage />} />
                    </Routes>
                </div>
            </Router>
        </AppState>
    );
}

export default App;
