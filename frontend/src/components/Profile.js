import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import Sidebar from './Sidebar';
import Header from './Header';
import '../Profile.css';

function Profile() {
    return (
        <>
            <Sidebar />
            <Header />
            <Card className="profile-card">
                <Card.Body>
                    <div className="name-section">
                       <PersonCircle  size={65} color="black"/> 
                       <h1>John Doe</h1>
                    </div>
                    <div className="credentials-section">
                        <Form className="form-section">
                            <Form.Group controlID="firstname">
                                <Form.Label>First name:</Form.Label>
                                <Form.Control type="text" placeholder="John"></Form.Control>
                            </Form.Group>
                            <Form.Group controlID="lastname">
                                <Form.Label>Last name:</Form.Label>
                                <Form.Control type="text" placeholder="John Doe"></Form.Control>
                            </Form.Group>
                            <Form.Group controlID="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" placeholder="John Doe"></Form.Control>
                            </Form.Group>
                            <Form.Group controlID="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="text" placeholder="John Doe"></Form.Control>
                            </Form.Group>
                            <div className="modify-btn">
                                <Button >Edit Info</Button>
                                <Button variant="danger" style={{marginLeft: "10px"}}>Delete Account</Button>
                            </div>
                        </Form>
                        
                    </div>
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Profile