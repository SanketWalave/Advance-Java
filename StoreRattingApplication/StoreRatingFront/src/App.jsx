import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Locations from "./pages/Locations";

function App() {
    return (
      <>
      <h1>hello i am testing hedding </h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/locations" element={<Locations />} />
            </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;