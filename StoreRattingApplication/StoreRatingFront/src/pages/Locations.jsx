import { useState, useEffect } from "react";
import api from "../services/api";
import "./Locations.css";
import Logout from "./Logout";

function Locations() {
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({ city: "", state: "", country: "" });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchLocations = async () => {
        try {
            setLoading(true);
            const response = await api.get("/locations");
            setLocations(response.data);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch locations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/locations/${editingId}`, form);
            } else {
                await api.post("/locations", form);
            }
            setForm({ city: "", state: "", country: "" });
            setEditingId(null);
            fetchLocations();
        } catch (err) {
            setError(err.response?.data?.message || "Operation failed");
        }
    };

    const handleEdit = (loc) => {
        setForm({ city: loc.city, state: loc.state, country: loc.country });
        setEditingId(loc.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this location?")) return;
        try {
            await api.delete(`/locations/${id}`);
            fetchLocations();
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed");
        }
    };

    return (
        <div className="location-container">
            <Logout></Logout>
            <h2>Location Management</h2>

            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit} className="location-form">
                <h3>{editingId ? "Edit Location" : "Add New Location"}</h3>
                <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="State"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    required
                />
                <div className="form-buttons">
                    <button type="submit" className="btn-primary">
                        {editingId ? "Update" : "Create"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => {
                                setEditingId(null);
                                setForm({ city: "", state: "", country: "" });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="location-list">
                <h3>All Locations</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : locations.length === 0 ? (
                    <p>No locations found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((loc) => (
                                <tr key={loc.id}>
                                    <td>{loc.city}</td>
                                    <td>{loc.state}</td>
                                    <td>{loc.country}</td>
                                    <td>
                                        <button onClick={() => handleEdit(loc)} className="btn-edit">Edit</button>
                                        <button onClick={() => handleDelete(loc.id)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Locations;