<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Player List</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f6f8;
            margin: 0;
            padding: 0;
        }

        .navbar {
            background-color: #007bff;
            color: white;
            padding: 15px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .navbar a {
            color: white;
            text-decoration: none;
            margin-left: 15px;
            font-weight: bold;
        }

        .navbar a:hover {
            text-decoration: underline;
        }

        .container {
            max-width: 900px;
            margin: 30px auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px;
        }

        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }

        .search-form {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        .search-input {
            width: 300px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px 0 0 6px;
            outline: none;
            font-size: 14px;
        }

        .search-btn {
            background-color: #007bff;
            border: none;
            color: white;
            padding: 10px 15px;
            border-radius: 0 6px 6px 0;
            cursor: pointer;
            font-size: 14px;
        }

        .search-btn:hover {
            background-color: #0056b3;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 8px;
            overflow: hidden;
        }

        th, td {
            text-align: left;
            padding: 12px 15px;
        }

        th {
            background: #007bff;
            color: white;
        }

        tr:nth-child(even) {
            background: #f2f2f2;
        }

        tr:hover {
            background: #e8f0fe;
        }

        .btn {
            padding: 6px 12px;
            border: none;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            font-size: 14px;
            margin-right: 5px;
        }

        .btn-update {
            background-color: #28a745;
        }

        .btn-delete {
            background-color: #dc3545;
        }

        .btn-update:hover {
            background-color: #218838;
        }

        .btn-delete:hover {
            background-color: #c82333;
        }

        .message {
            text-align: center;
            color: green;
            font-weight: bold;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <div class="navbar">
        <div><strong>Player Management</strong></div>
        <div>
            <a href="savePlayer">Add Player</a>
            <a href="viewPlayer">View Players</a>
        </div>
    </div>

    <div class="container">
        <h2>Player List</h2>

        <!-- Search Bar -->
        <div class="search-form">
            <input type="text" id="searchInput" placeholder="Search by name..." class="search-input">
            <button type="button" id="searchBtn" class="search-btn">Search</button>
        </div>

        <!-- Message -->
        <%
            String message = (String) request.getAttribute("message");
            if(message != null){
        %>
            <div class="message"><%= message %></div>
        <%
            }
        %>

        <!-- Player Table -->
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Runs</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="playerBody">
                <c:forEach var="player" items="${players}">
                    <tr>
                        <td>${player.id}</td>
                        <td>${player.name}</td>
                        <td>${player.runs}</td>
                        <td>
                            <form action="updatePlayer" method="get" style="display:inline;">
                                <input type="hidden" name="id" value="${player.id}" />
                                <button class="btn btn-update" type="submit">Update</button>
                            </form>
                            <form action="deletePlayer" method="post" style="display:inline;">
                                <input type="hidden" name="id" value="${player.id}" />
                                <button class="btn btn-delete" type="submit">Delete</button>
                            </form>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>

    <!-- JavaScript for live search -->
    <script>
        const searchInput = document.getElementById("searchInput");
        const searchBtn = document.getElementById("searchBtn");
        const tbody = document.getElementById("playerBody");

        function updateTable(players) {
            tbody.innerHTML = "";
            if (!players || players.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No players found</td></tr>`;
                return;
            }
            players.forEach(player => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${player.id}</td>
                    <td>${player.name}</td>
                    <td>${player.runs}</td>
                    <td>
                        <form action="updatePlayer" method="get" style="display:inline;">
                            <input type="hidden" name="id" value="${player.id}" />
                            <button class="btn btn-update" type="submit">Update</button>
                        </form>
                        <form action="deletePlayer" method="post" style="display:inline;">
                            <input type="hidden" name="id" value="${player.id}" />
                            <button class="btn btn-delete" type="submit">Delete</button>
                        </form>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function searchPlayers() {
            const skey = searchInput.value.trim();
            fetch('/search?skey=' + encodeURIComponent(skey))
                .then(res => res.json())
                .then(data => updateTable(data))
                .catch(err => console.error("Error fetching players:", err));
        }

        // Search on button click
        searchBtn.addEventListener("click", searchPlayers);
        // Search on keyup
        searchInput.addEventListener("keyup", searchPlayers);
    </script>
</body>
</html>
