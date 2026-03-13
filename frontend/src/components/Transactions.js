import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";

function Transactions({ selectedType }) {
  const [accountID, setAccountID] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);

  const itemsPerPage = 6;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    async function fetchAccountID() {
      try {
        const response = await fetch("https://api.banksie.app/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              `Failed to fetch: ${response.status} ${response.statusText}`,
          );
        }

        setAccountID(data.account_id);
      } catch (error) {
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
      } catch (error) {
        toast.error(error.message || "Failed to load account data.");
      }
    }

    loadData();
  }, [accountID]);

  async function fetchTransactions() {
    try {
      const response = await fetch(
        `https://api.banksie.app/account/${accountID}/transactions`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to fetch: ${response.status} ${response.statusText}`,
        );
      }

      setAllTransactions(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const filtered =
    selectedType === "all"
      ? allTransactions
      : allTransactions.filter((t) => t.type === selectedType);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedType]);

  const start = currentPage * itemsPerPage;
  const paginatedItems = filtered.slice(start, start + itemsPerPage);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  return (
    <>
      <ListGroup>
        {paginatedItems.map((item) => (
          <ListGroup.Item
            key={`${item.type}-${item.id}`}
            className="trans-list-item"
          >
            <div className="list-item-bottom">
              <div>
                <div className="trans-type-name">{item["type"]}</div>
                <div>{item["timestamp"].match(/^\d{4}-\d{2}-\d{2}/)[0]}</div>
              </div>

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
  );
}
export default Transactions;
