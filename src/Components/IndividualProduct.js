import React from "react";

export const IndividualProduct = (props) => {
  const { title, description, price, imageURL, addToCart } = props;
  const handleAddToCart = () => {
    addToCart(props);
  };

  return (
    <div className="product">
      <div className="product-img">
        <img src={imageURL} alt="product-img" />
      </div>
      <div className="product-text title">{title}</div>
      <div className="product-text description">{description}</div>
      <div className="product-text price">${price}</div>
      <div className="btn btn-danger btn-md cart-btn" onClick={handleAddToCart}>
        ADD TO CART
      </div>
    </div>
  );
};
