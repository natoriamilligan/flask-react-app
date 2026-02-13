import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import toast from 'react-hot-toast';

function Transactions({ selectedType }) {
    const [transactions, setTransactions] = useState([]);
    const [accountID, setAccountID] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const itemsPerPage = 6;
    const offset = currentPage * itemsPerPage;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        async function fetchAccountID() {
            try {
                const response = await fetch('http://localhost:5000/me', {
                    method: 'GET',
                    headers: {'Content-Type' : 'application/json'},
                    credentials: "include"
                })

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || `Failed to fetch: ${response.status} ${response.statusText}`);
                }

                setAccountID(data.account_id);

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
            const response = await fetch(`http://localhost:5000/account/${accountID}/transactions`, {
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

    useEffect(() => {
        if (selectedType === "select") {
            setPaginatedItems(transactions.slice(offset, offset + itemsPerPage));
            setPageCount(Math.ceil(transactions.length / itemsPerPage));
        }
    }, [transactions, currentPage])
    
    useEffect(() => {
        console.log("entered function")
        

        const newList = transactions.filter(function(element) {
            return element["type"] === selectedType;
        })
        
        setTransactions(newList)
        
    }, [selectedType])
     return (
        <>
            <ListGroup>
                {paginatedItems.map((item) => (
                    <ListGroup.Item key={item.id} className="trans-list-item">
                    <div className="list-item-bottom">
                        <div>{item["type"]}</div>
                        <div>${item["amount"]}</div>
                    </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="< prev"
                containerClassName={"pagnation-container"}
                previousLinkClassName={"previous color"}
                nextLinkClassName={"next color"}
                pageClassName={"page-list"}
            />
        </>
     )
}
export default Transactions