import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../bankOperations.css';
import Sidebar from './Sidebar.js';
import Header from './Header';

function Deposit() {
    const [deposit, setDeposit] = useState('');
    const [success, setSuccess] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const navigate = useNavigate();

    const toDashboard = () => {
        navigate('/dashboard');
    };

    const token = localStorage.getItem("accessToken");
    let accountId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        accountId = decodedToken.sub || decodedToken.identity;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://api.banksie.app/account/${accountId}/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: deposit
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