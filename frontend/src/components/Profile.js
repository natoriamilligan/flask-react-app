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
    const [isDisabled, setIsDisabled] = useState(true);
    const [active, setActive] = useState(false);
    const [passAlert, setPassAlert] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const token = localStorage.getItem("accessToken");
    let accountId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        accountId = decodedToken.sub || decodedToken.identity;
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.banksie.app/account/${accountId}`, {
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
        if (isDelete) {
            const response = await fetch(`https://api.banksie.app/account/${accountId}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}` 
                }
            })
        } else {
            if (password == "") {
            setPassAlert(true);
            } else {
                setIsDisabled(true);
                setPassAlert(false);
                const response = await fetch(`https://api.banksie.app/account/${accountId}`, {
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
                setActive(!active);
            }  
        }
    }

    return (
        <>
            <Sidebar />
            <Header />
            <Card className="profile-card">
                <Card.Body>
                    <div className="name-section">
                       <PersonCircle  size={65} color="black"/> 
                       <h1>{firstname.charAt(0).toUpperCase() + firstname.slice(1)} {lastname.charAt(0).toUpperCase() + lastname.slice(1)}</h1>
                    </div>
                    <div className="credentials-section">
                        <div className="edit-btn-section">
                            <button className="edit-btn" onClick= {() => {setIsDisabled(!isDisabled); setActive(!active); setPassword("")}} value="Edit">Edit Info</button>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="firstname">
                                <Form.Label>First name:</Form.Label>
                                <Form.Control type="text" 
                                disabled={isDisabled} 
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="lastname">
                                <Form.Label>Last name:</Form.Label>
                                <Form.Control 
                                type="text" 
                                disabled={isDisabled}  
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                readOnly
                                value={username}
                                disabled />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                type="password" 
                                disabled={isDisabled} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                                {passAlert &&
                                    <Form.Text muted>You must enter your password or create a new one.</Form.Text>    
                                }
                                
                            </Form.Group>
                            {active &&
                                <div className='modify-btn'>
                                    <Button type="submit">Save</Button>
                                    <Button type="submit" variant="danger" style={{marginLeft: "10px"}} onClick={() => setIsDelete(true)}>Delete Account</Button>
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