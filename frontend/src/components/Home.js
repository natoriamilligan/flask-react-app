import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

function Home() {
const navigate = useNavigate();

const toLogin = () => {
    navigate("/Login")
}

const toCreate = () => {
    navigate("/Create")
}

    return (
        <div className="wrapper">
            <h1>BANKSIE</h1>
            <div className="btn-wrapper">
                <Button className="front-btns" onClick={toLogin}>Login</Button>
                <Button className="front-btns" onClick={toCreate}>Create Account</Button>
                <Button className="front-btns">See Architecture Diagram</Button>
            </div>
      </div>
    )
}
export default Home