import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { AppContext } from "./context/AppContext";
import axios from "axios";
import NewsFolder from "./components/NewsFolder";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
function App() {
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    const { data } = await axios.get(
      "https://ecommerce-samurai.up.railway.app/product"
    );

    const productsData = data.data;

    setProducts(productsData);
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <AppContext.Provider value={{ products }}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
        <NewsFolder />
        <Footer />
        {/* <Nav />
        
        <NewsFolder />
        <Footer /> */}
      </Router>
    </AppContext.Provider>
  );
}

export default App;
