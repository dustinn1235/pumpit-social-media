import './styles.css';

// Components
import Navbar from './components/Navbar';

// Routes
import Routes from './components/routes/Routes';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <div id='page-container'>
            <Router>
              <AuthProvider>
                    <Navbar />
                    {/* This div is needed to add a height to the fixed Navbar above */}
                    <div style={{ height: '64px' }} />
                    <Routes />
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
