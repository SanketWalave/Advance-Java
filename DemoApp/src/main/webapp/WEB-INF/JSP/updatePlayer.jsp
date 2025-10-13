<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
    <title>Update Player</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: #f7f9fc;
            margin: 0;
            padding: 0;
        }

        /* Navbar styling */
        .navbar {
            background-color: #007bff;
            padding: 10px 20px;
            color: white;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .navbar a {
            color: white;
            text-decoration: none;
            margin-right: 15px;
            font-weight: bold;
        }
        .navbar a:hover {
            text-decoration: underline;
        }

        .form-container {
            background: #fff;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            width: 380px;
            margin: 50px auto;
        }

        h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #333;
        }

        table {
            width: 100%;
        }

        td {
            padding: 10px 0;
        }

        input[type="text"], input[type="number"] {
            width: 100%;
            padding: 8px;
            border-radius: 6px;
            border: 1px solid #ccc;
            outline: none;
            transition: border-color 0.2s ease;
        }

        input[type="text"]:focus, input[type="number"]:focus {
            border-color: #007bff;
        }

        input[type="submit"] {
            width: 100%;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        input[type="submit"]:hover {
            background-color: #0056b3;
        }

        .back-link {
            display: block;
            text-align: center;
            margin-top: 15px;
            color: #007bff;
            text-decoration: none;
            font-size: 14px;
        }

        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <!-- Navbar -->
    <div class="navbar">
        <a href="savePlayer">Add Player</a>
        <a href="viewPlayer">View Players</a>
    </div>

    <!-- Update Player Form -->
    <div class="form-container">
        <h2>Update Player</h2>

        <form:form action="saveUpdatePlayer" method="post" modelAttribute="player">
            <form:hidden path="id"/>

            <table>
                <tr>
                    <td>Name:</td>
                    <td><form:input path="name"/></td>
                </tr>
                <tr>
                    <td>Runs:</td>
                    <td><form:input path="runs" type="number"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" value="Update Player"/>
                    </td>
                </tr>
            </table>
        </form:form>

        <a href="viewPlayer" class="back-link">← Back to Player List</a>
    </div>

</body>
</html>
