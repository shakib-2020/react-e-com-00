import React, { useState } from "react";
import { storage, fs } from "../Config/Config";

export const AddProducts = () => {
  //product Info state
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  //   image state
  const [imageError, setImageError] = useState();

  // error state
  const [uploadError, setUploadError] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const handleProductInfo = (event) => {
    const { name, value } = event.target;
    setProductInfo((prevValue) => {
      if (name === "title") {
        return {
          title: value,
          description: prevValue.description,
          price: prevValue.price,
          image: prevValue.image,
        };
      } else if (name === "description") {
        return {
          title: prevValue.title,
          description: value,
          price: prevValue.price,
          image: prevValue.image,
        };
      } else if (name === "price") {
        return {
          title: prevValue.title,
          description: prevValue.description,
          price: value,
          image: prevValue.image,
        };
      } else if (name === "image") {
        return {
          title: prevValue.title,
          description: prevValue.description,
          price: prevValue.price,
          image: value,
        };
      }
    });
  };
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImage = (event) => {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductInfo((prevValue) => {
          return {
            title: prevValue.title,
            description: prevValue.description,
            price: prevValue.price,
            image: selectedFile,
          };
        });
        setImageError("");
      } else {
        setProductInfo.image = null;
        setImageError("Please select a valid image file type(png or jpg)");
      }
    } else {
      console.log("Please select your file");
    }
  };
  const handleAddProducts = (event) => {
    event.preventDefault();
    let { title, description, price, image } = productInfo;
    // console.log(title, description, price);
    // console.log(image);
    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            fs.collection("Products")
              .add({
                title,
                description,
                price: Number(price),
                url,
              })
              .then(() => {
                setSuccessMsg("Product added succesfully.");
                setProductInfo({
                  title: "",
                  description: "",
                  price: "",
                  image: null,
                });
                document.getElementById("file").value = "";
                setImageError("");
                setUploadError("");
                setTimeout(() => {
                  setSuccessMsg("");
                }, 3000);
              })
              .catch((error) => setUploadError(error.message));
          });
      }
    );
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h1>Add Products</h1>
      <hr></hr>
      {successMsg && (
        <>
          <br></br>
          <div className="success-msg">{successMsg}</div>
        </>
      )}
      <form
        autoComplete="off"
        className="form-group"
        onSubmit={handleAddProducts}
      >
        <label>Product Title</label>
        <input
          type="text"
          className="form-control"
          required
          name="title"
          value={productInfo.title}
          onChange={handleProductInfo}
        ></input>
        <br></br>
        <label>Product Description</label>
        <input
          type="text"
          className="form-control"
          required
          name="description"
          value={productInfo.description}
          onChange={handleProductInfo}
        ></input>
        <br></br>
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          name="price"
          value={productInfo.price}
          onChange={handleProductInfo}
        ></input>
        <br></br>
        <label>Upload Product Image</label>
        <input
          type="file"
          id="file"
          className="form-control"
          required
          onChange={handleProductImage}
        ></input>
        <br></br>
        {imageError && (
          <>
            <div className="error-msg">{imageError}</div>
            <br></br>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn-success btn-md">
            SUBMIT
          </button>
        </div>
        {uploadError && (
          <>
            <br></br>
            <div className="error-msg">{uploadError}</div>
          </>
        )}
      </form>
    </div>
  );
};
