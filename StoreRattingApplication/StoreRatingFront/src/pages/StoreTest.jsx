import { useState } from "react";
import axios from "axios";
import Logout from "./Logout";

function StoreTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [storeId, setStoreId] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:8888",
  });

  // Automatically attach JWT
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // =========================
  // LOGIN
  // =========================

  const login = async (e) => {
    e.preventDefault();

    setResponse(null);
    setError(null);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      setToken(res.data.token);

      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // =========================
  // GET ALL STORES
  // =========================

  const getStores = async () => {
    try {
      const res = await api.get("/stores");

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // =========================
  // GET STORE BY ID
  // =========================

  const getStore = async () => {
    try {
      const res = await api.get(`/stores/${storeId}`);

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // =========================
  // CREATE STORE
  // =========================

  const createStore = async () => {
    try {
      const res = await api.post("/stores", {
        name: "My Store",
        address: "Pune",
      });

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // =========================
  // UPDATE STORE
  // =========================

  const updateStore = async () => {
    try {
      const res = await api.put(`/stores/${storeId}`, {
        name: "Updated Store",
        address: "Mumbai",
      });

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // =========================
  // DELETE STORE
  // =========================

  const deleteStore = async () => {
    try {
      const res = await api.delete(`/stores/${storeId}`);

      setResponse(res.data || "Store deleted successfully");

      setError(null);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setResponse(null);
    setError(null);
  };

  

  // =========================
  // UI
  // =========================

  return (
    <div style={styles.container}>
        <Logout></Logout>
      <div style={styles.card}>
        <h2>Store API Test</h2>

       <a href="/locations" className="btn-primary" style={{ display: "inline-block", textDecoration: "none", padding: "8px 16px", borderRadius: "6px" }}>
    Go to Locations
</a>

        {!token ? (
          <form onSubmit={login}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.button}>Login</button>
          </form>
        ) : (
          <>
            <p>
              <strong>Authenticated ✅</strong>
            </p>

            <button style={styles.button} onClick={getStores}>
              GET All Stores
            </button>

            <input
              style={styles.input}
              placeholder="Store ID"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
            />

            <button style={styles.button} onClick={getStore}>
              GET Store
            </button>

            <button style={styles.button} onClick={createStore}>
              CREATE Store
            </button>

            <button style={styles.button} onClick={updateStore}>
              UPDATE Store
            </button>

            <button style={styles.delete} onClick={deleteStore}>
              DELETE Store
            </button>

            <button style={styles.logout} onClick={logout}>
              Logout
            </button>
          </>
        )}

        {/* RESPONSE */}

        {response && (
          <div style={styles.response}>
            <h3>API Response</h3>

            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div style={styles.error}>
            <h3>API Error</h3>

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

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },

  card: {
    width: "450px",
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
  },

  button: {
    width: "100%",
    padding: "11px",
    marginBottom: "10px",
    cursor: "pointer",
  },

  delete: {
    width: "100%",
    padding: "11px",
    marginBottom: "10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  logout: {
    width: "100%",
    padding: "11px",
    background: "#333",
    color: "white",
    border: "none",
    cursor: "pointer",
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

export default StoreTest;
