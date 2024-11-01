import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta a home */}
          <Route path="/login" element={<Login />} /> {/* Ruta a Login */}
        </Routes>
      </Router>
    </>
  );
}

export default App;