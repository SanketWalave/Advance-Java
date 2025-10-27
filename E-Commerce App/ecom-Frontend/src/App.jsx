import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Default route → Product List */}
        <Route path="/" element={<Home />} />
        <Route path="/addProduct" element={<h1>Add Product</h1>} />
        {/* <Route path="/update-product/:id" element={<UpdateProduct />} /> */}
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
