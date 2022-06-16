import React, { useEffect, useState } from "react";
import { auth, fs } from "../Config/Config";
import { CardProducts } from "./CardProducts";
import { Navbar } from "./Navbar";

export const Cart = () => {
  // state of cart product
  const [cartProducts, setCartProducts] = useState([]);
  //getting cart products from firebase collection and updateding the state
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        console.log("User is not signed in to retrive cart.");
      }
    });
  });

  // global variable
  let Product;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.price;
    // updating in database
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log("increment added");
          });
      } else {
        console.log("user is not logged in to increment");
      }
    });
  };
  // cart Product Decrease function
  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    Product.qty = Product.qty - 1;
    Product.TotalProductPrice = Product.qty * Product.price;
    // updating in database
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log("decrement added");
          });
      } else {
        console.log("user is not logged in to decrement");
      }
    });
  };

  return (
    <>
      <Navbar />
      <br></br>
      {cartProducts.length > 1 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="products-box">
            <CardProducts
              cartProducts={cartProducts}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrease={cartProductDecrease}
            />
          </div>
        </div>
      )}
      {cartProducts.length < 1 && (
        <div className="container-fluid">No Products to show.</div>
      )}
    </>
  );
};
