import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import "./App.css";
import AddProductForm from "./components/AddProductForm";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Product List */}
        <Route path="/" element={<ProductList />} />
        <Route path="/save" element={<AddProductForm />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />




        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
