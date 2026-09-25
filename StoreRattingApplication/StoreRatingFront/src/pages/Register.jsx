import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("USER"); // Default role

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8888",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        userType,
      });

      setResponse(res.data);
      // Optional: Redirect to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register New Account</h2>

        <form onSubmit={handleRegister}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

      <input
        type="hidden"
        name="userType"
        value={userType}
        />


          <button style={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={styles.loginLink}>
          Already have an account? <span onClick={() => navigate("/login")} style={styles.linkText}>Login here</span>
        </p>

        {/* RESPONSE */}
        {response && (
          <div style={styles.response}>
            <h3>Registration Success! 🎉</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div style={styles.error}>
            <h3>Registration Error</h3>
            <pre>
              {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
    padding: "20px",
  },
  card: {
    width: "400px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    boxSizing: "border-box",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "11px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },
  linkText: {
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  response: {
    marginTop: "20px",
    padding: "15px",
    background: "#e9f7ef",
    borderRadius: "6px",
    overflow: "auto",
  },
  error: {
    marginTop: "20px",
    padding: "15px",
    background: "#ffe6e6",
    borderRadius: "6px",
    overflow: "auto",
  },
};

export default Register;