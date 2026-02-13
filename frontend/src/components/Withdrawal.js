import { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../bankOperations.css';
import Header from './Header';
import Sidebar from './Sidebar';

function Withdrawal() {
    const [withdrawal, setWithdrawal] = useState('');
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
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/account/${accountID}/withdrawal`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: "include",
                body: JSON.stringify({
                    amount: withdrawal
                })
            })

            const data = await response.json();

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
                <Card.Header>Create Withdrawal</Card.Header>
                <Card.Body>
                    {success ? (
                        <>
                            <p>Withdrawal was successful!</p>
                            <Button onClick={toDashboard}>Back to Dashboard</Button>
                        </>
                    ) : (
                        <>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="form-input">
                                    <Form.Label className="fs-4">Amount:</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    value={withdrawal}
                                    onChange={(e) => setWithdrawal(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <div className="submit-btn">
                                    <Button type="submit">Withdrawal</Button>
                                </div>
                            </Form>
                            <div className="cancel-btn">
                                <Button variant="danger" onClick={toDashboard}>Cancel Withdrawal</Button>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Withdrawal