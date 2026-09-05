
import { useState } from "react";
import api from "../services/api";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setResponseData(null);
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            console.log("API Response:", response.data);

            // Save JWT
            localStorage.setItem("token", response.data.token);

            // Show API response on screen
            setResponseData(response.data);

        } catch (error) {

            console.error("Login Error:", error);

            setError(
                error.response?.data ||
                error.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h2>Welcome Back</h2>
                <p className="subtitle">
                    Login to your account
                </p>

                <form onSubmit={handleLogin}>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

                {/* API Response */}
                {responseData && (
                    <div className="response success">

                        <h3>API Response</h3>

                        <pre>
                            {JSON.stringify(responseData, null, 2)}
                        </pre>

                    </div>
                )}

                {/* API Error */}
                {error && (
                    <div className="response error">

                        <h3>Login Failed</h3>

                        <pre>
                            {typeof error === "string"
                                ? error
                                : JSON.stringify(error, null, 2)}
                        </pre>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Login;

