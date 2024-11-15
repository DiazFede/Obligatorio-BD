import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Help from './pages/Help';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import { UserProvider } from './contexts/UserContext';

function App() {

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} /> {/* Ruta a Login */}
            <Route path="/home" element={<Home />} /> {/* Ruta a Home */}
            <Route path="/help" element={<Help />} /> {/* Ruta a Help */}
            <Route path="register" element={<Register />} /> {/* Ruta a Register */}
            <Route path="/myaccount" element={<MyAccount />} /> {/* Ruta a MyAccount */}
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;