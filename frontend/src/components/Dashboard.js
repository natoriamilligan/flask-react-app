import { useState, useEffect } from 'react';
import { Button, Container, Card, Modal} from 'react-bootstrap';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import '../Dashboard.css';
import Header from './Header';
import Transactions from './Transactions';

function Dashboard() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [accountID, setAccountID] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        async function fetchAccountID() {
            try {
                const response = await fetch('https://api.banksie.app/me', {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                })

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`);
                }

                setAccountID(data.id);

            } catch(error) {
                toast.error(error.message);
            }
        }

        fetchAccountID();
    }, []);

    useEffect(() => {
        if (!accountID) return;

        async function loadData() {
            try {
                await fetchBalanceName();
            } catch(error) {
                toast.error(error.message || "Failed to load account data.")
            }
        }

        loadData();
    }, [accountID]);

    async function fetchBalanceName() {
        try {
            const response = await fetch(`https://api.banksie.app/account/${accountID}`, {
                method: 'GET',
                headers: {'Content-Type' : 'application/json'} ,
                credentials: "include"
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`);
            }

            setBalance(data.balance);
            setName(data.first_name);

        } catch(error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Sidebar />
            <Header />
            <Container>
                <div className="acct-header-container">
                    <h2 className="display-3">Hello {name ? name.charAt(0).toUpperCase() + name.slice(1) : ""}!</h2>
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