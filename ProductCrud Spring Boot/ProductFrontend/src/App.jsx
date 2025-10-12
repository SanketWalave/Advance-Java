import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import "./App.css";
import AddProductForm from "./components/AddProductForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Product List */}
        <Route path="/" element={<ProductList />} />
        <Route path="/save" element={<AddProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
