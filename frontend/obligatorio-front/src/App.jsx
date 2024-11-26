import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Help from './pages/Help';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminInstructores from './pages/AdminInstructores';
import AdminAlumnos from './pages/AdminAlumnos';
import { UserProvider } from './contexts/UserContext';

function App() {

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/help" element={<Help />} />
            <Route path="register" element={<Register />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admininstructores" element={<AdminInstructores />} />
            <Route path="/adminalumnos" element={<AdminAlumnos />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;