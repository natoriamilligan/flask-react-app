import { useEffect, useState } from 'react';
import { Card, Button, Form, Modal} from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../Profile.css';

function Profile() {
    const [password, setPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isDelete, setIsDelete] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [loginAlert, setLoginAlert] = useState(false);
    const [loginShow, setLoginShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [changePasswordShow, setChangePasswordShow] = useState(false);
    const [changePasswordAlert, setChangePasswordAlert] = useState(false);
    const [successShow, setSuccessShow] = useState(false);
    const [accountID, setAccountID] = useState('');


    const handleLoginClose = () => setLoginShow(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleSuccessClose = () => setSuccessShow(false);
    const handleChangePasswordClose = () => setChangePasswordShow(false);

    useEffect(() => {
        async function fetchAccountID() {
            try {
                const response = await fetch('https://api.banksie.app/me', {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setAccountID(data.id);

            } catch(error) {
                toast.error(error.message);
            }
        }

        fetchAccountID();
    }, []);

    useEffect(() => {
        if (!accountID) return;

        async function loadData() {
            try {
                await fetchData();
            } catch(error) {
                toast.error(error.message || "Failed to load account data.")
            }
        }

        loadData();
    }, [accountID]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.banksie.app/account/${accountID}`, {
                method: 'GET',
                headers: {'Content-Type' : 'application/json'},
                credentials: "include"
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`);
            }

            setFirstname(data.first_name || "");
            setLastname(data.last_name || "");
            setUsername(data.username || "");
        } catch(error) {
            toast.error(error.message);
        }
            
    }

    const loginReturn = () => {
        navigate("/login");
    };
    
    const handleChangePassword = async (e) => {
        if (password == "") {
            setChangePasswordAlert(true);
        } else {
            try {
                const response = await fetch(`https://api.banksie.app/account/${accountID}`, {
                    method: 'PUT',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include",
                    body: JSON.stringify({
                        password: password 
                    })
                })

                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`)
                }

                setChangePasswordShow(false);
                setSuccessShow(true);
            } catch(error) {
                toast.error(error.message)
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
                        headers: {'Content-Type' : 'application/json'},
                        credentials: "include",
                        body: JSON.stringify({
                            username: loginUsername,
                            password: loginPassword 
                    })
                })

                const data = await response.json();

                if (!response.ok) {
                   throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`)
                }
                
                setLoginShow(false);
                
                if (isDelete) {
                    setIsDelete(false);
                    setDeleteShow(true);
                } else if (isChangePassword) {
                    setIsChangePassword(false)
                    setChangePasswordShow(true)
                }
            } catch(error) {
                toast.error(error.message)
                setLoginShow(false);
            }
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.banksie.app/logout', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: "include"
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`)
            }

            loginReturn();
        } catch(error) {
            error.toast(error.message)
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.banksie.app/account/${accountID}`, {
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'},
                credentials: "include"
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`)
            }

            setDeleteShow(false);
            handleLogout();
        } catch(error) {
            toast.error(error.message)
            setDeleteShow(false);
        }
        
    };

    return (
        <>
            <Sidebar />
            <Header />
            <Modal show={loginShow} onHide={handleLoginClose}>
                <Modal.Header>
                    <Modal.Title>Verify Credentials</Modal.Title>
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
            <Modal show={changePasswordShow} onHide={handleChangePasswordClose}>
                <Modal.Header>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please enter a new password.</p>
                    <Form onSubmit={handleChangePassword}>
                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                            type="text"  
                            value={password}
                            onChange={() => setPassword(e.target.value)}
                            />
                            {changePasswordAlert &&
                                <Form.Text>Please enter a new password.</Form.Text>
                            }
                        </Form.Group>
                        <div className="login-btn">
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form>        
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal> 
            <Modal show={successShow} onHide={handleSuccessClose}>
                <Modal.Header>
                    <Modal.Title>Password Change Successful!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You have successfully changed your password.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSuccessClose}>Close</Button>
                </Modal.Footer>
            </Modal>                
            <Card className="profile-card">
                <Card.Body>
                    <div className="name-section">
                       <PersonCircle  size={65} color="black"/> 
                       <h1>{firstname.charAt(0).toUpperCase() + firstname.slice(1)} {lastname.charAt(0).toUpperCase() + lastname.slice(1)}</h1>
                    </div>
                    <div className="credentials-section">
                        <Form onSubmit={() => setLoginShow(true)}>
                            <Form.Group controlId="firstname">
                                <Form.Label>First name:</Form.Label>
                                <Form.Control type="text"  
                                value={firstname}
                                disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="lastname">
                                <Form.Label>Last name:</Form.Label>
                                <Form.Control 
                                type="text" 
                                value={lastname}
                                disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                readOnly
                                value={username}
                                disabled 
                                />
                            </Form.Group>
                                <div className='modify-btn'>
                                    <Button type="submit" onClick={() => setIsChangePassword(true)}>Change Password</Button>
                                    <Button type="submit" variant="danger" style={{marginLeft: "10px"}} onClick={() => setIsDelete(true)}>Delete Account</Button>
                                </div>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </>
        
    )
}
export default Profile
