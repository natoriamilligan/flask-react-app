import { useEffect, useState } from 'react';
import { Card, Button, Form, Modal} from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import Sidebar from './Sidebar';
import Header from './Header';
import '../Profile.css';

function Profile() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [active, setActive] = useState(false);
    const [passAlert, setPassAlert] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [loginAlert, setLoginAlert] = useState(false);

    const [loginShow, setLoginShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [changePasswordShow, setChangePasswordShow] = useState(false);

    const handleLoginClose = () => setLoginShow(false);
    const handleDeleteClose = () => setDeleteShow(false);

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
                return alert("Error fetching data from database.");
            }
            
        }
        fetchData();
    }, []);

    const loginReturn = () => {
        navigate("/login");
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDelete) {
            setLoginShow(true)
            setIsDelete(false)
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
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username == "" || password == "") {
            setLoginAlert(true);
        } else {
            try {
                const response = await fetch('https://api.banksie.app/login', {
                        method: 'POST',
                        headers: { 'Content-Type' : 'application/json' },
                        body: JSON.stringify({
                            username: loginUsername,
                            password: loginPassword 
                    })
                })

                if (response.ok) {
                    setLoginShow(false);
                    setDeleteShow(true);
                } else {
                    alert("Login unsuccessful. Please try again.")
                }
            } catch {
                alert("Something wrong with the server");
            }
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.banksie.app/logout', {
                method: 'POST',
                headers: { 
                    'Content-Type' : 'application/json'
                }
            })

            if (!response.ok) {
                throw new error("Logout failed.")
            }

            loginReturn();
        } catch {
            alert("There was an error logging out.");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.banksie.app/account/${accountId}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type' : 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error("Deletion failed.")
            }

            setDeleteShow(false);
            handleLogout();
        } catch {
            alert("Error deleting account. Please try again");
            setDeleteShow(false);
        }
        
    };

    return (
        <>
            <Sidebar />
            <Header />
            <Modal show={loginShow} onHide={handleLoginClose}>
                <Modal.Header>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please enter your account credentials.</p>

                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId='username'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control 
                                type='text' 
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                                type='text' 
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            {loginAlert &&
                                <Form.Text>Please enter username and password.</Form.Text>
                            }
                        </Form.Group>
                        <div className="login-btn">
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal> 
            <Modal show={deleteShow} onHide={handleDeleteClose}>
                <Modal.Header>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete your account?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>  
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