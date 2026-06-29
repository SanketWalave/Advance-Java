import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {

  const [users, setUsers] = useState([]);

  // add form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // update form
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // search
  const [search, setSearch] = useState("");

  // CSV file
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:8081/getAllUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ---------------- ADD USER ----------------

  const addUser = () => {

    if (!name || !email) {
      alert("Enter name and email");
      return;
    }

    axios.post("http://localhost:8081/addUser", {
      name: name,
      email: email
    })
    .then(() => {
      fetchUsers();
      setName("");
      setEmail("");
    })
    .catch((error) => {
      console.error(error);
    });
  };

  // ---------------- DELETE USER ----------------

  const deleteUser = (id) => {

    axios.delete(`http://localhost:8081/deleteUser/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ---------------- OPEN UPDATE FORM ----------------

  const editUser = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // ---------------- UPDATE USER ----------------

  const updateUser = () => {

    axios.put(`http://localhost:8081/updateUsers/${editId}`, {
      name: editName,
      email: editEmail
    })
    .then(() => {
      fetchUsers();
      setEditId(null);
      setEditName("");
      setEditEmail("");
    })
    .catch((error) => {
      console.error(error);
    });
  };

  // ---------------- CSV UPLOAD ----------------

  const uploadCsv = () => {

    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios.post("http://localhost:8081/getCsv", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      alert("CSV Uploaded Successfully");
      fetchUsers();
      setFile(null);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  // ---------------- SEARCH ----------------

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <h2>User Management</h2>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {/* CSV UPLOAD FORM */}

      <h3>Upload CSV</h3>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadCsv}>Upload CSV</button>

      <br /><br />

      {/* ADD USER FORM */}

      <h3>Add User</h3>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={addUser}>Add User</button>

      <br /><br />

      {/* UPDATE FORM */}

      {editId && (

        <div>

          <h3>Update User</h3>

          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />

          <button onClick={updateUser}>Update</button>
          <button onClick={() => setEditId(null)}>Cancel</button>

        </div>

      )}

      <br />

      {/* USERS TABLE */}

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {filteredUsers.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                <button onClick={() => editUser(user)}>
                  ✏️
                </button>
              </td>

              <td>
                <button onClick={() => deleteUser(user.id)}>
                  ❌
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default UsersList;