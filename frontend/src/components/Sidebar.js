import { useState, useRef, useEffect } from 'react';
import { Stack, Nav } from 'react-bootstrap';
import '../Sidebar.css';

function Sidebar() {
    const [open, setOpen] = useState(false);
    const navRef = useRef(null)
    
    const toggleNav = (e) => {
        e.preventDefault();
        setOpen(!open)
    }
    
    const clickOutside = (e) => {
        if (navRef.current && !navRef.current.contains(e.target)) {
            setOpen(false);
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
                    <Nav.Item>
                        <Nav.Link href="/dashboard" className="nav-links fs-5" >Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dashboard" className="nav-links fs-5">Create Deposit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dashboard" className="nav-links fs-5">Withdrawls</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dashboard" className="nav-links fs-5">Send Transfer</Nav.Link>
                    </Nav.Item>
                </Stack>
            </Nav>
        </div>
    )
}
export default Sidebar