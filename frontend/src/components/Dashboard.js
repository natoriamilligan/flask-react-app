import { useState, useEffect } from 'react';
import { Button, Container, Card, Modal} from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './Sidebar';
import '../Dashboard.css';
import Header from './Header';
import Transactions from './Transactions';

function Dashboard() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const token = localStorage.getItem("accessToken");
    let accountId = null;
    
    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            accountId = decodedToken.sub || decodedToken.identity;
        }
        
        async function fetchTransactions() {
            const response = await fetch(`https://api.banksie.app/account/${accountId}/transactions`, {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'}
            })

            if (response.ok) {
                const data = await response.json();
                setName(data.first_name);
                setBalance(data.balance);
            }
        }

        fetchTransactions();
    }, []);

    return (
        <>
            <Sidebar />
            <Header />
            <Container>
                <div className="acct-header-container">
                    <h2 className="display-3">Hello {name.charAt(0).toUpperCase() + name.slice(1)}!</h2>
                    <p className="acct-display">Checking</p>
                </div>
                <Card>
                    <Card.Body className="acct-balance">
                        <h2 className="display-1">${Number(balance).toFixed(2)}</h2>
                        <button className="acct-details" onClick={handleShow}>Account Details</button>
                    </Card.Body>
                </Card>
                <Card className="trans-card">
                    <Card.Header>Transactions</Card.Header>
                    <Transactions />
                    <Card.Footer className="trans-footer">
                        <button className="trans-footer-btn">View more</button>
                    </Card.Footer>
                </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Account Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Rounting number: 1234567896</p>
                        <p>Account number: 789456123000</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>

    )
};
export default Dashboard