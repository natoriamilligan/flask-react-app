import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import '../bankOperations.css';
import Header from './Header';

function Transfer() {
    const [transfer, setTransfer] = useState('');
    const [recipient, setRecipient] = useState('');
    const [memo, setMemo] = useState('');
    const [empty, setEmpty] = useState(false);

    const token = localStorage.getItem("accessToken");
    let accountId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        accountId = decodedToken.sub || decodedToken.identity;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (empty == "") {
            setEmpty(true);
        } else {
            const response = await fetch(`http://localhost:5000/account/${accountId}/transfer`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: transfer,
                    memo: memo,
                    submitter_id: accountId,
                    recipient_id: recipient
                })
            })

            if (response.ok) {
            alert("yes")
        } else {
            alert("no")
        }
        }
    };

    return (
        <>
            <Header />
            <Card className="form-card">
                <Card.Header>Create Transfer</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-input">
                            <Form.Label className="fs-4">Amount:</Form.Label>
                            <Form.Control 
                            type="text"
                            value={transfer}
                            onChange={(e) => setTransfer(e.target.value)}
                            />
                            <Form.Text muted>Daily limit $5,000</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="fs-5">Recipient Account Number:</Form.Label>
                            <Form.Control 
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            />
                            {empty &&
                                    <Form.Text muted>You must enter a recipient account number.</Form.Text>    
                                }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="fs-5">Memo:</Form.Label>
                            <Form.Control 
                            type="text"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            />
                        </Form.Group>
                        <div className="submit-btn">
                            <Button type="submit">Transfer</Button>
                        </div>
                    </Form>
                    <div className="cancel-btn">
                        <Button variant="danger">Cancel Transfer</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Transfer