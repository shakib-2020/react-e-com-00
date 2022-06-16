import React from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";

export const IndividualCartProduct = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };
  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };
  return (
    <div className="product">
      <div className="product-img">
        <img src={cartProduct.imageURL} alt="product-img" />
      </div>
      <div className="product-text title">{cartProduct.title}</div>
      <div className="product-text description">{cartProduct.description}</div>
      <div className="product-text price">$ {cartProduct.price}</div>
      <span>Quantity</span>
      <div className="product-text quantity-box">
        <div className="action-btns minus">
          <Icon icon={minus} size={20} onClick={handleCartProductDecrease} />
        </div>
        <div>{cartProduct.qty}</div>
        <div className="action-btns plus">
          <Icon icon={plus} size={20} onClick={handleCartProductIncrease} />
        </div>
      </div>
      <div className="product-text cart-price">
        $ {cartProduct.TotalProductPrice}
      </div>
      <div className="btn btn-danger btn-md cart-btn">DELETE</div>
    </div>
  );
};
