import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast;'
import Login from './components/login';
import Create from './components/Create';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';
import Transfer from './components/Transfer';
import Home from './components/Home';
import RefreshSession from './components/RefreshSession';
import './App.css';



function App() {
  const [showModal, setShowModal] = useState(false);
  const [loginTime, setLoginTime] = useState(null);
  const [noResponse, setNoResponse] = useState(false);

  const navigate = useNavigate();

  const logoutReturn = () => {
    navigate("/logout");
  };
  
  useEffect(() => {
    if (!loginTime) return;

    const timer = setTimeout(function(){
      setShowModal(true);
    }, 60000 - 40000);

    const timer2 = setTimeout(function(){
      if (noResponse) {
        logoutSession();
      }
    }, 60000 - 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [loginTime])

  const logoutSession = async () => {
      try {
          const response = await fetch('http://localhost:5000/logout', {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              credentials: "include"
          })

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`)
          }

          setLoginTime(null);
          logoutReturn();
      } catch(error) {
          toast.error(error.message)
      }
  };

  return (
    <Container fluid className="px-0">
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setLoginTime={setLoginTime}/>} />
          <Route path='/create' element={<Create />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/withdrawal' element={<Withdrawal />} />
          <Route path='/transfer' element={<Transfer />} />
        </Routes>
        {showModal && <RefreshSession showModal={showModal} setShowModal={setShowModal} setLoginTime={setLoginTime} setNoResponse={setNoResponse} />}
      </Router>
    </Container>
  );
}

export default App;
