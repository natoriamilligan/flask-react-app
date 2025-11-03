import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import '../Deposit.css';
import Header from './Header';

function Deposit() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const response = fetch("")
    }

    return (
        <>
            <Header />
            <Card className="deposit-card">
                <Card.Header>Create Deposit</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="deposit-input">
                            <Form.Label className="fs-4">Amount:</Form.Label>
                            <Form.Control type="text"></Form.Control>
                            <Form.Text muted>Daily limit $5,000</Form.Text>
                        </Form.Group>
                        <div className="deposit-btn">
                            <Button type="submit">Deposit</Button>
                        </div>
                    </Form>
                    <div className="cancel-btn">
                        <Button variant="danger">Cancel Deposit</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Deposit