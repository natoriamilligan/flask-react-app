import { useState } from 'react';
import { Card, Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Create.css';

function Create() {
    const navigate = useNavigate();
    const [firstname, createFirstname] = useState('');
    const [lastname, createLastname] = useState('');
    const [username, createUsername] = useState('');
    const [password, createPassword] = useState('');
    const [createError, setCreateError] = useState(false);

    const btnLink = () => {
      navigate('/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (firstname == "" || lastname == "" || username == "" || password == "") {
          setCreateError(true);
        } else {
            try {
              const response = await fetch('http://localhost:5000/create', {
                  method: 'POST',
                  headers: {'Content-Type' : 'application/json'},
                  body: JSON.stringify({
                      first_name : firstname,
                      last_name : lastname,
                      username : username,
                      password : password
                  })
              })
              if (response.ok) {
                navigate("/dashboard");
              } 
          } catch {
              alert("Something wrong with the server");
          }
        }
    }

    return (
      <Container fluid className="px-0 create-container">
        <Card bg="light" className="create-card">
          <Card.Header>Banksie</Card.Header>
          <Card.Body>
            <Card.Title>Create Account</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='firstname'>
                <Form.Label>First Name:</Form.Label>
                <Form.Control 
                  type='text' 
                  value={firstname}
                  onChange={(e) => createFirstname(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='lastname'>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control 
                  type='text' 
                  value={lastname}
                  onChange={(e) => createLastname(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='username'>
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                  type='text' 
                  value={username}
                  onChange={(e) => createUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                  type='text' 
                  value={password}
                  onChange={(e) => createPassword(e.target.value)}
                />
                {createError &&
                  <Form.Text>Please complete all fields.</Form.Text>
                }
              </Form.Group>
              <div className="card-btn">
                <Button type="submit" >Create Account</Button>
              </div>
            </Form>
            <div className="card-btn">
              <Button variant="secondary" onClick={btnLink}>Log in</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    )
};
export default Create;
