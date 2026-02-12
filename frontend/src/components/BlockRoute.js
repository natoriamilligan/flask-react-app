import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function BlockRoute({ route }) {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function verifyLogin() {
            try {
                const response = await fetch('http://localhost:5000/me', {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                })

                if (!response.ok) {
                    setLoggedIn(false);
                } else {
                    setLoggedIn(true);
                }
            } catch {
                setLoggedIn(false);
            } finally {
                setLoading(false);
            }
        }

        verifyLogin();
    }, []);

    if (loading) return <p>Loading...</p>
    if (!loggedIn) return <Navigate to="/login" />;

    return route;
};

export default BlockRoute;