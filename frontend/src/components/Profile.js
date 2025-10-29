import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './Sidebar';
import Header from './Header';
import '../Profile.css';

function Profile() {
    const [isReadOnly, setReadOnly] = useState(true);
    const [active, setActive] = useState(true);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');

    const token = localStorage.getItem("accessToken");
    let accountId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        accountId = decodedToken.sub || decodedToken.identity;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/account/${accountId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}` 
            },
            body: JSON.stringify({
                first_name: firstname,
                last_name: lastname,
                password: password 
            })
        })
    }

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
                        <Form className="form-section" onSubmit={handleSubmit}>
                            <Form.Group controlId="firstname">
                                <Form.Label>First name:</Form.Label>
                                <Form.Control type="text" 
                                placeholder="John" 
                                readOnly={isReadOnly} 
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="lastname">
                                <Form.Label>Last name:</Form.Label>
                                <Form.Control type="text" placeholder="Doe" readOnly />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" placeholder="jDoe123" readOnly />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" readOnly />
                            </Form.Group>
                            <div className="modify-btn">
                                {active ? (
                                    <Button onClick= {() => {setReadOnly(false); setActive(!active);}} value="Edit">Edit Info</Button>
                                ) : (
                                    <Button type="submit" onClick= {() => {setReadOnly(true); setActive(!active)}}>Save</Button>
                                )}
                                <Button type="submit" variant="danger" style={{marginLeft: "10px"}}>Delete Account</Button>
                            </div>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Profile