import { useState } from 'react';
import { Stack, Nav } from 'react-bootstrap';
import '../Sidebar.css';

function Sidebar() {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-stack");

    navToggle.addEventListener("click", (e) => {
        e.preventDefault()
        navLinks.classList.toggle("active");
    });

    return (
        <div>
            <Nav>
                <a id="nav-toggle" href="">
                    <span class="nav-bar"></span>
                    <span class="nav-bar"></span>
                    <span class="nav-bar"></span>
                </a>
                <Stack gap={2} id="nav-stack">
                    <Nav.Item>
                        <Nav.Link href="/dashboard">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dashboard">Create Deposit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dashboard">Withdrawls</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/dashboard">Send Transfer</Nav.Link>
                    </Nav.Item>
                </Stack>
                
            </Nav>
        </div>
    )
}
export default Sidebar