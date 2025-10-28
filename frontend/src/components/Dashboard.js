import { useState } from 'react';
import { Button, Container, Card, Modal } from 'react-bootstrap';
import Sidebar from './Sidebar';
import '../Dashboard.css';

function Dashboard() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    return (
        <>
            <Sidebar />
            <Container>
                <div className="header-container">
                    <h2 className="display-3">Hello John!</h2>
                    <p className="acct-display">Checking ...8809</p>
                </div>
                <Card>
                    <Card.Body className="acct-balance">
                        <h2 className="display-1">$782.38</h2>
                        <button className="acct-details" onClick={handleShow}>Account Details</button>
                    </Card.Body>
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