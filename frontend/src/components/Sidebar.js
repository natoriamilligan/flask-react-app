import { useState, useRef, useEffect } from 'react';
import { Stack, Nav } from 'react-bootstrap';
import {NavLink, useLocation} from 'react-router-dom';
import '../Sidebar.css';

function Sidebar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const navRef = useRef(null)
    const location =useLocation();
    
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
                <Stack gap={2} id="nav-stack" className={open ? "active" : ''}>
                    <Nav.Item className={location.pathname === "/dashboard" ? "nav-items" : ""}>
                        <Nav.Link 
                        as={NavLink}
                        to="/dashboard" 
                        className={location.pathname === "/dashboard" ? "nav-link-active nav-links fs-5" : "nav-links fs-5"}
                        >
                        Home
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link 
                        as={NavLink}
                        to="/deposit" 
                        className={location.pathname === "/deposit" ? "nav-link-active nav-links fs-5" : "nav-links fs-5"}
                        >
                        Deposit Funds
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link 
                        as={NavLink}
                        to="/withdrawl" 
                        className={location.pathname === "/withdrawl" ? "nav-link-active nav-links fs-5" : "nav-links fs-5"}
                        >
                        Withdrawl Funds
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link 
                        as={NavLink}
                        to="/tranfer" 
                        className={location.pathname === "/transfer" ? "nav-link-active nav-links fs-5" : "nav-links fs-5"}
                        >
                        Send Transfer
                        </Nav.Link>
                    </Nav.Item>
                </Stack>
            </Nav>
        </div>
    )
}
export default Sidebar