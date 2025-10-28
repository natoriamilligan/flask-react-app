import { useState } from 'react';
import { Button, Collapse, Container, Card } from 'react-bootstrap';
import Sidebar from './Sidebar';
import '../Dashboard.css';

function Dashboard() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Sidebar />
            <Container fluid>
                <div className="header-container">
                    <h1 className="display-3">Hello John!</h1>
                    <p className="acct-display">Checking ...8809</p>
                </div>
                
            </Container>
        </>

    )
};
export default Dashboard