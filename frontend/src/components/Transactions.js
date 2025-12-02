import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const token = localStorage.getItem("accessToken");
    let accountId = null;

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            accountId = decodedToken.sub || decodedToken.identity;
        }
        
        async function fetchTransactions() {
            const response = await fetch(`https://api.banksie.app/account/${accountId}/transactions`, {
                  method: 'GET',
                  headers: {'Content-Type' : 'application/json'}
            })

            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            }
        }

        fetchTransactions();
    }, []);

     return (
        <>
            <ListGroup>
                {transactions.map((item) => (
                    <ListGroup.Item className="trans-list-item">
                    <div className="list-item-top">DATE</div>
                    <div className="list-item-bottom">
                        <div>{item["type"]}</div>
                        <div>${item["amount"]}</div>
                    </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
     )
}
export default Transactions