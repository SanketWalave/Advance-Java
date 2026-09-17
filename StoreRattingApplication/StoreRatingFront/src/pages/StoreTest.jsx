import { useState, useEffect } from "react";
import axios from "axios";
import Logout from "./Logout";

function StoreTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));

  // Store Form States
  const [storeId, setStoreId] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);

  // UI Control for Form visibility & Editing mode
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // List of stores for the table
  const [storesList, setStoresList] = useState([]);

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

  // Fetch locations for the dropdown
  const fetchLocations = async () => {
    try {
      const res = await api.get("/locations");
      setLocations(res.data);
    } catch (err) {
      console.error("Failed to fetch locations", err);
    }
  };

  // Fetch all stores
  const getStores = async () => {
    try {
      const res = await api.get("/stores");
      setResponse(res.data);
      if (Array.isArray(res.data)) {
        setStoresList(res.data);
      } else {
        setStoresList([res.data]);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLocations();
      getStores();
    }
  }, [token]);

  // =========================
  // LOGIN
  // =========================

  const login = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setResponse(res.data);
      fetchLocations();
      getStores();
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // =========================
  // CREATE / UPDATE STORE SUBMIT
  // =========================

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: storeName,
        email: storeEmail,
        address: storeAddress,
        location: Number(selectedLocation),
      };

      let res;
      if (isEditing) {
        res = await api.put(`/stores/${storeId}`, payload);
      } else {
        res = await api.post("/stores", payload);
      }

      setResponse(res.data);
      setError(null);
      resetForm();
      getStores();
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  // Open form for Create
  const handleOpenAdd = () => {
    resetForm();
    setIsEditing(false);
    setShowForm(true);
  };

  // Open form for Edit pre-filled
  const handleEditClick = (store) => {
    setStoreId(store.id);
    setStoreName(store.name);
    setStoreEmail(store.email);
    setStoreAddress(store.address);
    setSelectedLocation(store.location?.id || "");
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setStoreId(null);
    setStoreName("");
    setStoreEmail("");
    setStoreAddress("");
    setSelectedLocation("");
    setShowForm(false);
    setIsEditing(false);
  };

  // =========================
  // DELETE STORE
  // =========================

  const deleteStore = async (id) => {
    if (!window.confirm("Are you sure you want to delete this store?")) return;
    try {
      const res = await api.delete(`/stores/${id}`);
      setResponse(res.data || "Store deleted successfully");
      setError(null);
      getStores();
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
    setStoresList([]);
    setError(null);
  };

  // =========================
  // UI
  // =========================

  return (
    <div style={styles.container}>
      <Logout />
      <div style={styles.card}>
        <h2>Store Management</h2>

        <div style={styles.topNav}>
          <a href="/locations" className="btn-primary" style={styles.linkButton}>
            Go to Locations
          </a>
        </div>

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
            <div style={styles.headerActionRow}>
              <p style={{ margin: 0 }}>
                <strong>Authenticated ✅</strong>
              </p>
              {!showForm && (
                <button style={styles.addBtn} onClick={handleOpenAdd}>
                  + Add Store
                </button>
              )}
            </div>

            {/* Store Form Section */}
            {showForm && (
              <form onSubmit={handleFormSubmit} style={styles.formSection}>
                <h4>{isEditing ? "Edit Store" : "Add New Store"}</h4>
                <input
                  style={styles.input}
                  placeholder="Store Name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
                <input
                  style={styles.input}
                  type="email"
                  placeholder="Store Email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  required
                />
                <input
                  style={styles.input}
                  placeholder="Store Address"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  required
                />
                <select
                  style={styles.input}
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.city}, {loc.state} ({loc.country})
                    </option>
                  ))}
                </select>
                <div style={styles.formButtonRow}>
                  <button type="submit" style={styles.button}>
                    {isEditing ? "Update Store" : "Save Store"}
                  </button>
                  <button type="button" style={styles.cancelBtn} onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <button style={styles.logout} onClick={logout}>
              Logout
            </button>
          </>
        )}

        {/* STORES TABLE */}
        {storesList.length > 0 && (
          <div style={styles.tableContainer}>
            <h3>Stores List</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Address</th>
                  <th style={styles.th}>Rating</th>
                  <th style={styles.th}>Owner ID</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {storesList.map((store) => (
                  <tr key={store.id}>
                    <td style={styles.td}>{store.id}</td>
                    <td style={styles.td}>{store.name}</td>
                    <td style={styles.td}>{store.email}</td>
                    <td style={styles.td}>{store.address}</td>
                    <td style={styles.td}>{store.averageRating} ⭐</td>
                    <td style={styles.td}>{store.ownerId ?? "N/A"}</td>
                    <td style={styles.td}>
                      {store.location
                        ? `${store.location.city}, ${store.location.state} (${store.location.country})`
                        : "No Location Assigned"}
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.editActionBtn}
                        onClick={() => handleEditClick(store)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteActionBtn}
                        onClick={() => deleteStore(store.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
    padding: "20px",
  },
  card: {
    width: "850px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
  },
  topNav: {
    marginBottom: "15px",
  },
  linkButton: {
    display: "inline-block",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    background: "#007bff",
    color: "white",
    fontSize: "14px",
  },
  headerActionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  addBtn: {
    padding: "8px 14px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  formSection: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "15px",
    border: "1px solid #e5e7eb",
  },
  formButtonRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    boxSizing: "border-box",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    flex: 1,
    padding: "11px",
    cursor: "pointer",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  cancelBtn: {
    flex: 1,
    padding: "11px",
    cursor: "pointer",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  logout: {
    width: "100%",
    padding: "11px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  tableContainer: {
    marginTop: "20px",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    background: "#f3f4f6",
    color: "#374151",
    padding: "8px",
    border: "1px solid #d1d5db",
    fontSize: "13px",
  },
  td: {
    padding: "8px",
    border: "1px solid #d1d5db",
    fontSize: "13px",
    textAlign: "center",
  },
  editActionBtn: {
    padding: "5px 10px",
    background: "#ffc107",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
    fontWeight: "bold",
  },
  deleteActionBtn: {
    padding: "5px 10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
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