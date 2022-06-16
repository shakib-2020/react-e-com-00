import React from "react";
import { IndividualProduct } from "./IndividualProduct";

export const Products = (props) => {
  const { products, addToCart } = props;
  return (
    <>
      {products.map((product) => (
        <IndividualProduct
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          imageURL={product.url}
          addToCart={addToCart}
        />
      ))}
    </>
  );
};
