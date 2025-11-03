import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import '../bankOperations.css';
import Header from './Header';

function Withdrawal() {
    const [withdrawal, setWithdrawal] = useState('');

    const token = localStorage.getItem("accessToken");
    let accountId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        accountId = decodedToken.sub || decodedToken.identity;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/account/${accountId}/withdrawal`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: withdrawal
            })
        })

        if (response.ok) {
            alert("yes")
        } else {
            alert("no")
        }
    };

    return (
        <>
            <Header />
            <Card className="form-card">
                <Card.Header>Create Withdrawal</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-input">
                            <Form.Label className="fs-4">Amount:</Form.Label>
                            <Form.Control 
                            type="text"
                            value={withdrawal}
                            onChange={(e) => setWithdrawal(e.target.value)}
                            ></Form.Control>
                            <Form.Text muted>Daily limit $5,000</Form.Text>
                        </Form.Group>
                        <div className="submit-btn">
                            <Button type="submit">Withdrawal</Button>
                        </div>
                    </Form>
                    <div className="cancel-btn">
                        <Button variant="danger">Cancel Withdrawal</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Withdrawal