import Home from "../pages/home";
import { Routes, Route, Navigate } from "react-router-dom";
import Product from "../pages/product";
import ProductDetail from "../pages/productDetail";
import Hype from "../pages/hype";
import AboutUs from "../pages/aboutUs";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import UserCart from "../pages/userCart";
import CheckOut from "../pages/checkOut";

function App() {
  let user = sessionStorage.getItem("user");
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/hype" element={<Hype />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/user-cart" element={<UserCart />} />
        <Route
          path="/order"
          element={user ? <CheckOut /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </div>
  );
}

export default App;
