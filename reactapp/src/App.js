import './styles.css';
import AppState from './context/AppState';

// Components
import Navbar from './components/Navbar';

// Routes
import Routes from './components/routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <AppState>
            <Router>
                <Navbar />
                {/* This div is needed to add a height to the fixed Navbar above */}
                <div style={{ height: '64px' }} />
                <Routes />
            </Router>
        </AppState>
    );
}

export default App;
