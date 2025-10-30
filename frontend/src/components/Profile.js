import { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { jwtDecode } from 'jwt-decode';
import Sidebar from './Sidebar';
import Header from './Header';
import '../Profile.css';

function Profile() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isReadOnly, setReadOnly] = useState(true);
    const [active, setActive] = useState(false);

    const token = localStorage.getItem("accessToken");
    let accountId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        accountId = decodedToken.sub || decodedToken.identity;
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/account/${accountId}`, {
                method: 'GET',
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}` 
                }
            })

            if (response.ok) {
                const data = await response.json();
                setFirstname(data.first_name || "");
                setLastname(data.last_name || "");
                setUsername(data.username || "");
            } else {
                return alert("Please try again.");
            }
        }
        fetchData();
    }, []);
    

    

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
                        <div className="edit-btn-section">
                            <button className="edit-btn" onClick= {() => {setReadOnly(false); setActive(!active);}} value="Edit">Edit Info</button>
                        </div>
                        <Form onSubmit={handleSubmit}>
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
                                <Form.Control 
                                type="text" 
                                placeholder="Doe" 
                                readOnly={isReadOnly} 
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                type="text" 
                                value={username}
                                readOnly />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                type="password" 
                                readOnly={isReadOnly}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            {active &&
                                <div className='modify-btn'>
                                    <Button type="submit" onClick= {() => {setReadOnly(true)}}>Save</Button>
                                    <Button type="submit" variant="danger" style={{marginLeft: "10px"}}>Delete Account</Button>
                                </div>
                            }
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Profile