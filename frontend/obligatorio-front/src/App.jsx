import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Help from './pages/Help';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Ruta a Login */}
          <Route path="/home" element={<Home />} /> {/* Ruta a Home */}
          <Route path="/help" element={<Help />} /> {/* Ruta a Help */}
        </Routes>
      </Router>
    </>
  );
}

export default App;