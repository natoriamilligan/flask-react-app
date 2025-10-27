import { useState } from 'react';
import { Button, Collapse, Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';

function Dashboard() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Sidebar />
        </>

    )
};
export default Dashboard