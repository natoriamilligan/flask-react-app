import { useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import toast from "react-hot-toast";
import "../Create.css";

function Create() {
  const navigate = useNavigate();
  const [firstname, createFirstname] = useState("");
  const [lastname, createLastname] = useState("");
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [score, setScore] = useState(0);
  const [weakPassword, setWeakPassword] = useState(false);

  const btnLink = () => {
    navigate("/login");
  };

  const passwordStrength = (e) => {
    const newPassword = e.target.value;
    createPassword(newPassword);

    const passwordCheck = zxcvbn(newPassword);
    setScore(passwordCheck.score);

    if (passwordCheck.score < 4) {
      setWeakPassword(true);
    } else {
      setWeakPassword(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstname === "" ||
      lastname === "" ||
      username === "" ||
      password === ""
    ) {
      setCreateError(true);
    } else {
      try {
        const response = await fetch("https://api.banksie.app/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            first_name: firstname,
            last_name: lastname,
            username: username,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              `Failed to fetch: ${response.status} ${response.statusText}`,
          );
        }

        setIsCreated(true);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Container fluid className="px-0 create-container">
      <Card bg="light" className="create-card">
        <Card.Header>Banksie</Card.Header>
        <Card.Body>
          {isCreated ? (
            <>
              <p>You've successfully created an account! Please log in.</p>
              <Button onClick={btnLink}>Log in</Button>
            </>
          ) : (
            <>
              <Card.Title>Create Account</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstname">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstname}
                    onChange={(e) => createFirstname(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="lastname">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastname}
                    onChange={(e) => createLastname(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="username">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => createUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={passwordStrength}
                  />
                  {weakPassword && (
                    <Form.Text>Password weak. Please try again.</Form.Text>
                  )}
                  {createError && (
                    <Form.Text>Please complete all fields.</Form.Text>
                  )}
                </Form.Group>
                <div className="card-btn">
                  <Button type="submit" disabled={score < 4}>
                    Create Account
                  </Button>
                </div>
              </Form>
              <div className="card-btn">
                <Button variant="secondary" onClick={btnLink}>
                  Log in
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Create;
