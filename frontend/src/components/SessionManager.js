import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import RefreshSession from "./RefreshSession";

function SessionManager({ loginTime, setLoginTime }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logoutReturn = () => {
    navigate("/logout");
  };

  useEffect(() => {
    if (!loginTime) return;

    const timer = setTimeout(function () {
      setShowModal(true);
    }, 900000 - 30000);

    const timer2 = setTimeout(function () {
      logoutSession();
    }, 900000 - 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [loginTime]);

  const logoutSession = async () => {
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

  return (
    <>
      {showModal && (
        <RefreshSession
          showModal={showModal}
          setShowModal={setShowModal}
          setLoginTime={setLoginTime}
        />
      )}
    </>
  );
}
export default SessionManager;
