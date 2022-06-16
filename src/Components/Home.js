import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth, fs } from "../Config/Config";

export const Home = () => {
  // to rediracted to login page
  const navigate = useNavigate();
  //getting user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  const uid = GetUserUid();
  // state of main product
  const [products, setProducts] = useState([]);

  // consuming product from firestore database
  useEffect(() => {
    fs.collection("Products").onSnapshot((snepshot) => {
      const products = snepshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    });
  }, []);

  // add to cart functinality
  let Product;

  const addToCart = (product) => {
    if (uid !== null) {
      Product = JSON.parse(JSON.stringify(product)); // parse json to solve "product" is not extensible error.
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart " + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          console.log("Successfully Added to cart.");
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <br></br>
      {products.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Products</h1>
          <div className="products-box">
            <Products products={products} addToCart={addToCart} />
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className="container-fluid">Please wait....</div>
      )}
    </>
  );
};
