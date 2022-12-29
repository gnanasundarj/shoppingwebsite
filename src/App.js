import Home from "./pages/home";
import Payment from "./pages/payment";
import Register from "./pages/Register";
import Success from "./pages/success";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Userauth from "./pages/Userauth";
import Product from "../src/components/Product/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={"/payment"} element={<Payment />} />
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/success"} element={<Success />} />

        <Route exact path={"/login"} element={<Userauth />} />

        <Route exact path={"/wish"} element={<Wishlist />} />

        <Route
          exact
          path={"/productlist/:catagory"}
          element={<ProductList />}
        />

        <Route exact path={"/product/:info"} element={<Product />} />

        <Route exact path={"/cart"} element={<Cart />} />
      </Routes>
    </Router>

    // <div>
    //   {/* <Home /> */}
    //   <ProductList />
    //   {/* <Product /> */}
    //   {/* <Register /> */}
    //   {/* <Cart /> */}
    // </div>
  );
}

export default App;
