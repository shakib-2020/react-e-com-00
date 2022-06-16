import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddProducts } from "./Components/AddProducts";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { NotFound } from "./Components/NotFound";
import { Signup } from "./Components/Signup";
import { Cart } from "./Components/Cart";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exect path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
