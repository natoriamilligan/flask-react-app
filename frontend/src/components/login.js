import { useState } from 'react';
import { Card, Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAlert, setLoginAlert] = useState(false);

  const createLink = () => {
    navigate("/create");
  };

  const dashboardLink = () => {
    navigate("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username == "" || password == "") {
      setLoginAlert(true);
    } else {
        try {
          const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
              username: username,
              password: password 
            })
          })

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.access_token);
          dashboardLink();
        } else {
          alert("Login unsuccessful. Please try again.")
        }
      } catch {
        alert("Something wrong with the server");
      }
    }
  }
  
  return (
    <Container fluid className="px-0 login-container">
      <Card className="login-card" bg="light">
        <Card.Header>Banksie</Card.Header>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
              <Form.Label>Username:</Form.Label>
              <Form.Control 
                type='text' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password:</Form.Label>
              <Form.Control 
                type='text' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loginAlert &&
                <Form.Text>Please enter username and password.</Form.Text>
              }
            </Form.Group>
            <div className="card-btn">
              <Button type="submit">Sign In</Button>
            </div>
          </Form>
          <div className="card-btn">
            <Button variant="secondary" onClick={createLink}>Create Account</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
    
  )
}
export default Login;