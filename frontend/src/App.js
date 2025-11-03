import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Create from './components/Create';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Deposit from './components/Deposit';
import Withdrawal from './components/Withdrawal';

function App() {
  return (
    <Container fluid className="px-0">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/withdrawal' element={<Withdrawal />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
