import { useState, useEffect } from 'react';
import { Container, Card, Modal} from 'react-bootstrap';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import '../Dashboard.css';
import Header from './Header';
import Transactions from './Transactions';

function Dashboard() {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [accountID, setAccountID] = useState('');
    const [selectedType, setSelectedType] = useState('select'); 
    
    useEffect(() => {
        async function fetchAccountID() {
            try {
                const response = await fetch('http://localhost:5000/me', {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                })

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`);
                }

                setAccountID(data.account_id);

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
            const response = await fetch(`http://localhost:5000/account/${accountID}`, {
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
                        <h5>Balance</h5>
                        <h2 className="display-1">${Number(balance).toFixed(2)}</h2>
                    </Card.Body>
                </Card>
                <Card className="trans-card">
                    <Card.Header className="trans-header">
                        <h5>Transactions</h5>
                        <div className="filter-container">
                            <select value={selectedType} className="filter-select" name="types" id="types" onChange={(e) => {setSelectedType(e.target.value)}}>
                                <option value="select">Transaction Type</option>
                                <option value="deposit">Deposit</option>
                                <option value="withdrawal">Withdrawal</option>
                                <option value="transfer">Transfer</option>
                            </select>
                        </div>
                    </Card.Header>
                    <Transactions selectedType={selectedType}/>
                </Card>
            </Container>
        </>

    )
};
export default Dashboard