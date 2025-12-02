import { useState, useRef, useEffect } from 'react';
import { Stack, Nav, Button } from 'react-bootstrap';
import {NavLink, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Sidebar.css';

function Sidebar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const navRef = useRef(null)
    const location =useLocation();
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch("https://api.banksie.app/logout", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            }
        })

        if (response.ok) {
            navigate("/logout");
        }
    }
    
    const toggleNav = (e) => {
        e.preventDefault();
        setOpen(!open);
        setActive(!active);
    }
    
    const clickOutside = (e) => {
        if (navRef.current && !navRef.current.contains(e.target)) {
            setOpen(false);
            setActive(false);
        }
        
    }

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", clickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', clickOutside);
        }
    }, [open])

    if (active) {
        document.body.classList.add("no-scroll");
    } else {
        document.body.classList.remove('no-scroll');
    }
    

    return (
        <div>
            {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
            <Nav ref={navRef}>
                <a id="nav-toggle" href="" onClick={toggleNav}>
                    <span className="nav-bar"></span>
                    <span className="nav-bar"></span>
                    <span className="nav-bar"></span>
                </a>
                <Stack gap={2} id="nav-stack" className={open ? "active" : 'wrapper'}>
                    <Nav.Item className={location.pathname === "/dashboard" ? "nav-items" : ""}>
                        <Nav.Link 
                        as={NavLink}
                        to="/dashboard" 
                        className={location.pathname === "/dashboard" ? "nav-link-active nav-links fs-6" : "nav-links fs-6"}
                        >
                        Home
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={location.pathname === "/deposit" ? "nav-items" : ""}>
                        <Nav.Link 
                        as={NavLink}
                        to="/deposit" 
                        className={location.pathname === "/deposit" ? "nav-link-active nav-links fs-6" : "nav-links fs-6"}
                        >
                        Deposit Funds
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={location.pathname === "/withdrawal" ? "nav-items" : ""}>
                        <Nav.Link 
                        as={NavLink}
                        to="/withdrawal" 
                        className={location.pathname === "/withdrawal" ? "nav-link-active nav-links fs-6" : "nav-links fs-6"}
                        >
                        Withdrawal Funds
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={location.pathname === "/transfer" ? "nav-items" : ""}>
                        <Nav.Link 
                        as={NavLink}
                        to="/transfer" 
                        className={location.pathname === "/transfer" ? "nav-link-active nav-links fs-6" : "nav-links fs-6"}
                        >
                        Send Transfer
                        </Nav.Link>
                    </Nav.Item>
                    <Button className="logout-btn" variant="danger" onClick={handleLogout}>Logout</Button>
                </Stack>
            </Nav>
        </div>
    )
}
export default Sidebar