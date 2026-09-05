import { useState } from "react";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            console.log("Login successful:", response.data);

            // Assuming backend returns { token: "..." }
            localStorage.setItem("token", response.data.token);

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
}

export default Login;

