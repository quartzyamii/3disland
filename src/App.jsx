// App.jsx

// import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home } from './pages';

import Navbar from './components/Navbar';

const App = () => {
  return (
    <main className="bg-slate-300/20">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </main>
  )
}

export default App;
