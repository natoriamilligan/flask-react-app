import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../bankOperations.css';
import Header from './Header';
import Sidebar from './Sidebar';

function Transfer() {
    const [transfer, setTransfer] = useState('');
    const [recipient, setRecipient] = useState('');
    const [memo, setMemo] = useState('');
    const [empty, setEmpty] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [success, setSuccess] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();
    const [accountID, setAccountID] = useState('');

    const toDashboard = () => {
        navigate('/dashboard');
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (recipient == "") {
            setEmpty(true);
        } else {
            try {
                const response = await fetch(`https://api.banksie.app/transfer`, {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body: JSON.stringify({
                        amount: transfer,
                        memo: memo,
                        submitter_id: accountID,
                        recipient_id: recipient
                    })
                })

                const data = await response.json();

                if (!response.ok) {
                    if (data["code"] == 404) {
                        setEmpty(false);
                        setNotFound(true);
                    } else {
                        setIsInvalid(true);
                    }

                    throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`)
                }

                setSuccess(true);
            } catch(error) {
                toast.error(error.message)
            }
        }
    };

    return (
        <>
            <Sidebar />
            <Header />
            <Card className="form-card">
                <Card.Header>Create Transfer</Card.Header>
                <Card.Body>
                    {success ? (
                        <>
                            <p>Transfer was successful!</p>
                            <Button onClick={toDashboard}>Back to Dashboard</Button>
                        </>
                    ) : (
                        <>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="form-input">
                                    <Form.Label className="fs-4">Amount:</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    value={transfer}
                                    onChange={(e) => setTransfer(e.target.value)}
                                    />
                                    <Form.Text muted>Daily limit $5,000</Form.Text><br />
                                    {isInvalid &&
                                        <Form.Text>Please enter a valid amount.</Form.Text>
                                    }
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
                                    {notFound &&
                                            <Form.Text muted>Please enter a valid account number.</Form.Text>    
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
                        </>
                    )}
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Transfer