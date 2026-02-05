import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../bankOperations.css';
import Header from './Header';
import Sidebar from './Sidebar';

function Withdrawal() {
    const [withdrawal, setWithdrawal] = useState('');
    const [success, setSuccess] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const navigate = useNavigate();

    const toDashboard = () => {
        navigate('/dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://api.banksie.app/account/${accountId}/withdrawal`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            credentials: "include",
            body: JSON.stringify({
                amount: withdrawal
            })
        })

        if (response.ok) {
            setSuccess(true);
        } else {
            setIsInvalid(true);
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
                                    <Form.Text muted>Daily limit $5,000</Form.Text><br />
                                    {isInvalid &&
                                        <Form.Text>Please enter a valid number.</Form.Text>
                                    }
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