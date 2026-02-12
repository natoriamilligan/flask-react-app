import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/login';
import Create from './components/Create';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';
import Transfer from './components/Transfer';
import Home from './components/Home';
import BlockRoute from './components/BlockRoute';
import SessionManager from './components/SessionManager';
import './App.css';

function App() {
  const [loginTime, setLoginTime] = useState(null);

  return (
    <Container fluid className="px-0">
      <Toaster position="top-right" />
      <Router>
        <SessionManager loginTime={loginTime} setLoginTime={setLoginTime} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setLoginTime={setLoginTime}/>} />
          <Route path='/create' element={<Create />} />
          <Route path='/dashboard' element={<BlockRoute route={ <Dashboard /> } />} />
          <Route path='/logout' element={<BlockRoute route={ <Logout /> } />} />
          <Route path='/profile' element={<BlockRoute route={ <Profile /> } />} />
          <Route path='/deposit' element={<BlockRoute route={ <Deposit /> } />} />
          <Route path='/withdrawal' element={<BlockRoute route={ <Withdrawal /> } />} />
          <Route path='/transfer' element={<BlockRoute route={ <Transfer /> } />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
