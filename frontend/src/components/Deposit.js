import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../bankOperations.css';
import Sidebar from './Sidebar.js';
import Header from './Header';

function Deposit() {
    const [deposit, setDeposit] = useState('');
    const [success, setSuccess] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [accountID, setAccountID] = useState('');
    const navigate = useNavigate();

    const toDashboard = () => {
        navigate('/dashboard');
    };

    useEffect(() => {
        async function fetchAccountID() {
            try {
                const response = await fetch('https://api.banksie.app/me', {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setAccountID(data.id);

            } catch(error) {
                toast.error(error.message);
            }
        }

        fetchAccountID();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api.banksie.app/account/${accountID}/deposit`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: "include",
                body: JSON.stringify({
                    amount: deposit
                })
            })

            if (!Number.isFinite(Number(deposit))) {
                setIsInvalid(true);
            }

            if (!response.ok) {
                throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`);
            } 

            setSuccess(true);
        } catch(error) {
            toast.error(error.message);
        }
        
    };

    return (
        <>
            <Sidebar />
            <Header />
            <Card className="form-card">
                <Card.Header>Create Deposit</Card.Header>
                <Card.Body>
                    <>
                        {success ? (
                            <>
                                <p>Deposit was successful!</p>
                                <Button onClick={toDashboard}>Back to Dashboard</Button>
                            </>
                        ) : (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="form-input">
                                        <Form.Label className="fs-4">Amount:</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        value={deposit}
                                        onChange={(e) => setDeposit(e.target.value)}
                                        ></Form.Control>
                                        <Form.Text muted>Daily limit $5,000</Form.Text><br />
                                        {isInvalid &&
                                            <Form.Text>Please enter a valid number.</Form.Text>
                                        }
                                    </Form.Group>
                                    <div className="submit-btn">
                                        <Button type="submit">Deposit</Button>
                                    </div>
                                </Form>
                                <div className="cancel-btn">
                                    <Button variant="danger" onClick={toDashboard}>Cancel Deposit</Button>
                                </div>
                            </>
                        )}
                    </>
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Deposit