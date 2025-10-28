import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from './Header';

function Profile() {
    return (
        <>
            <Sidebar />
            <Header />
            <h1>This is the profile</h1>
        </>
        
    )
}
export default Profile