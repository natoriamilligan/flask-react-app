import './App.css';
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
import RefreshSession from './components/RefreshSession';



function App() {
  const [showModal, setShowModal] = useState(false);
  const [loginTime, setLoginTime] = useState(null);
  
  useEffect(() => {
    if (!loginTime) return;

    const timer = setTimeout(function(){
      setShowModal(true);
    }, 900000 - 30000);

    return () => clearTimeout(timer);
  }, [loginTime])

  return (
    <Container fluid className="px-0">
      <Toaster position="top-right" />
      {showModal && <RefreshSession show={showModal} setShowModal={setShowModal} setLoginTime={setLoginTime} />}
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
      </Router>
    </Container>
  );
}

export default App;
