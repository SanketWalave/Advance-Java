import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Locations from "./pages/Locations";
import Register from "./pages/Register";

function App() {
    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;