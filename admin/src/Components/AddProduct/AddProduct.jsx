import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [arImage, setArImage] = useState(null); // State for AR image
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    arImage: "", // Add AR image to product details
    category: "earring",
    gender: "women",
    jewel: "",
    new_price: "",
    old_price: ""
  });

  const addProduct = async () => {
    let dataObj;
    let product = productDetails;

    // Upload main image
    let formData = new FormData();
    formData.append('product', image);
    if (arImage) { // Check if AR image is provided
      formData.append('arImage', arImage); // Append AR image
    }

    await fetch(`${backend_url}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json())
      .then((data) => { dataObj = data });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      if (arImage) {
        product.arImage = dataObj.ar_image_url; // Add AR image URL if uploaded
      }
      console.log("Product to be sent:", product);
      await fetch(`${backend_url}/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => {
          console.log("Response status:", resp.status);
          return resp.json();
        })
        .then((data) => { 
          console.log("Response data:", data);
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input type="text" name="description" value={productDetails.description} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
      </div>

      <div className="addproduct-itemfield">
        <p>Jewel Name</p>
        <input type="text" name="jewel" value={productDetails.jewel} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" name="old_price" value={productDetails.old_price} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="new_price" value={productDetails.new_price} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
        </div>
      </div>

      <div className="checkbox-container">
        <div className="addproduct-itemfield">
          <p>For Which Gender</p>
          <select value={productDetails.gender} name="gender" className="add-product-selector" onChange={changeHandler}>
            <option value="any">Any</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>

        <div className="addproduct-itemfield">
          <p>Product type</p>
          <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
            <option value="earring">Earring</option>
            <option value="pendant">Pendant</option>
            <option value="finger-ring">Finger Ring</option>
            <option value="mangalsutra">Mangalsutra</option>
            <option value="chain">Chain</option>
            <option value="nose-pin">Nose Pin</option>
            <option value="necklace">Necklace</option>
            <option value="necklace-set">Necklace Set</option>
            <option value="bangle">Bangle</option>
            <option value="bracelet">Bracelet</option>
            <option value="pendant-earring-set">Pendant Earring Set</option>
            <option value="gold-coin">Gold Coin</option>
          </select>
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="file-input" accept="image/*" hidden />
      </div>

      {/* New AR image input field */}
      <div className="addproduct-itemfield">
        <p>AR Product Image (optional)</p>
        <label htmlFor="ar-file-input">
          <img className="addproduct-thumbnail-img" src={!arImage ? upload_area : URL.createObjectURL(arImage)} alt="" />
        </label>
        <input onChange={(e) => setArImage(e.target.files[0])} type="file" name="arImage" id="ar-file-input" accept="image/*" hidden />
      </div>
      <button className="addproduct-btn" onClick={addProduct}>ADD</button>
    </div>
  );
};

export default AddProduct;
