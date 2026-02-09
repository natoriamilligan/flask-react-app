import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import toast from 'react-hot-toast';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [accountID, setAccountID] = useState('');

    useEffect(() => {
        async function fetchAccountID() {
            try {
                const response = await fetch('https://api.banksie.app/me', {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setAccountID(data.id);

            } catch(error) {
                toast.error(error.message);
            }
        }

        fetchAccountID();
    }, []);

    useEffect(() => {
        if (!accountID) return;

        async function loadData() {
            try {
                await fetchTransactions();
            } catch(error) {
                toast.error(error.message || "Failed to load account data.")
            }
        }

        loadData();
    }, [accountID]);

    async function fetchTransactions() {

        try {
            const response = await fetch(`https://api.banksie.app/account/${accountID}/transactions`, {
                  method: 'GET',
                  headers: {'Content-Type' : 'application/json'},
                  credentials: "include"
            })

            const data = await response.json();

            if (!response.ok) {  
                throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`);
            }

            setTransactions(data);
        } catch(error) {
            toast.error(error.message)
        }     
    }

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