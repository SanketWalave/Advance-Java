import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

function Logout() {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payloadBase64 = token.split(".")[1];
                const decodedPayload = JSON.parse(atob(payloadBase64));
                // Adjust "sub" or "email" or "name" based on your JWT payload structure
                setUserName(decodedPayload.sub || decodedPayload.email || "User");
            } catch (err) {
                console.error("Failed to parse token:", err);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="logout-container">
            <span className="user-welcome">Welcome, {userName}</span>
            <button onClick={handleLogout} className="btn-logout">
                Logout
            </button>
        </div>
    );
}

export default Logout;