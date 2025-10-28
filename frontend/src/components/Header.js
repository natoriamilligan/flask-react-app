import {NavLink} from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';
import '../Header.css';

function Header() {
    return (
        <header>
            <h1 className="header-title">Banksie</h1>
            <NavLink
            to="/profile"
            className="profile-icon"
            >
                <PersonCircle  size={25} color="black"/>
            </NavLink>
        </header>
    )
}
export default Header