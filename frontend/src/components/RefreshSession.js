import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function RefreshSession({ showModal, setShowModal, setLoginTime }) {
  const navigate = useNavigate();

  const logoutReturn = () => {
    navigate("/logout");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://api.banksie.app/logout", {
        method: "POST",
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

      setShowModal(false);
      setLoginTime(null);
      logoutReturn();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch("https://api.banksie.app/refresh", {
        method: "POST",
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

      setLoginTime(Date.now());
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
    >
      <Modal.Header>
        <Modal.Title>Continue Session</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Would you like to continue your session? Otherwise you will be logged
        out.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={handleRefresh}>Continue Session</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default RefreshSession;
