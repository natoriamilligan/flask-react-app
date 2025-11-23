import { Card, Button } from 'react-bootstrap';
import '../Logout.css';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login")
    }
    return (
        <Card className="card-wrapper">
            <Card.Header bg="light">Banksie</Card.Header>
            <Card.Body className="body-wrapper">
                <Card.Text>You have been successfully logged out.</Card.Text>
                <Button className="login-btn" onClick={handleLogout}>Login</Button>
            </Card.Body>
        </Card>
    )
}
export default Logout