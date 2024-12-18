const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require('fs');
const port = process.env.PORT || 5039;

app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Database Connection With MongoDB
const uri = "mongodb+srv://tanmaydhole:doggg@cluster0.w6tanm6.mongodb.net/jewellery?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define Schemas and Models
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  arImage: { type: String }, // New field for AR image (optional)
  category: { type: String, required: true },
  jewel: { type: String, required: true },
  gender: { type: String, required: true },
  new_price: { type: Number },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

// Image Storage Engine 
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});
const upload = multer({ storage: storage });

app.post("/upload", upload.fields([{ name: 'product' }, { name: 'arImage' }]), (req, res) => {
  const response = { success: 1 };

  // Handle product image
  if (req.files['product']) {
    response.image_url = `/images/${req.files['product'][0].filename}`;
  }

  // Handle AR image if it exists
  if (req.files['arImage']) {
    response.ar_image_url = `/images/${req.files['arImage'][0].filename}`;
  }

  res.json(response);
});

// Route for Images folder
app.use('/images', express.static(uploadDir));

// Middleware to fetch user from token
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    if (!data.user || !data.user.id) {
      return res.status(401).send({ errors: "Invalid token: missing user information" });
    }
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


// ROOT API Route For Testing
app.get("/", (req, res) => {
  res.send("Root");
});

// Create an endpoint at /login for logging in the user and giving auth-token
app.post('/login', async (req, res) => {
  let success = false;
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password; // Consider hashing passwords in production
    if (passCompare) {
      const data = { user: { id: user.id } };
      success = true;
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success, token });
    } else {
      return res.status(400).json({ success, errors: "Please try with correct email/password" });
    }
  } else {
    return res.status(400).json({ success, errors: "Please try with correct email/password" });
  }
});

// Create an endpoint at /signup for registering the user & sending auth-token
app.post('/signup', async (req, res) => {
    try {
      console.log("Sign Up");
      let success = false;
      let check = await User.findOne({ email: req.body.email });
      if (check) {
        return res.status(400).json({ success, errors: "Existing user found with this email" });
      }
      let cart = {};
      for (let i = 0; i < 300; i++) {
        cart[i] = 0;
      }
      const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password, // Consider hashing passwords in production
        cartData: cart,
      });
      await user.save();
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, 'secret_ecom');
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.error("Error in /signup endpoint:", error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Endpoint for getting all products data
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// Endpoint for getting latest products data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({}).sort({ date: -1 }).limit(8); // Fetch latest 8 products
  res.send(products);
});

// Endpoint for getting popular women's products data
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" }).limit(4);
  res.send(products);
});

// Endpoint for getting related products data
app.post("/relatedproducts", async (req, res) => {
  const { category } = req.body;
  if (!category) {
    return res.status(400).json({ success: false, message: "Category is required" });
  }
  const products = await Product.find({ category }).limit(4);
  res.send(products);
});

// Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  if (!userData.cartData[req.body.itemId]) {
    userData.cartData[req.body.itemId] = 1;
  } else {
    userData.cartData[req.body.itemId] += 1;
  }
  await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

// Create an endpoint for removing the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] && userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
  } else {
    res.status(400).send("Item not in cart");
  }
});

// Create an endpoint for getting cart data of user
app.post('/getcart', fetchuser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Create an endpoint for adding products using admin panel
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product = products[products.length - 1];
    id = last_product.id + 1; // Increment the last product's ID
  } else {
    id = 1; // Start with 1 if no products exist
  }

  // Ensure all required fields are provided
  if (!req.body.name || !req.body.description || !req.body.image || !req.body.category || !req.body.gender || !req.body.jewel) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const productData = {
    id: id, // Include the id in the product data
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    arImage: req.body.arImage, // Ensure this is included
    category: req.body.category,
    jewel: req.body.jewel,
    gender: req.body.gender,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    available: true,
  };

  const newProduct = new Product(productData);
  
  try {
    await newProduct.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Create an endpoint for removing products using admin panel
app.post("/removeproduct", async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ success: false, message: "Product ID is required" });
  }
  const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });
  if (deletedProduct) {
    res.json({ success: true, name: deletedProduct.name });
  } else {
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

// Search endpoint for product names
app.get("/search", async (req, res) => {
  const { query } = req.query; // The search query from the frontend
  console.log(`Search query received: ${query}`);

  if (!query) {
    return res.status(400).json({ success: false, message: "No search query provided" });
  }

  try {
    // Find products where the name contains the search query (case-insensitive)
    const products = await Product.find({
      name: { $regex: query, $options: "i" }
    }).limit(100); // Limit results to 10

    console.log(`Products found: ${products.length}`);
    res.json(products);
  } catch (error) {
    console.error("Error searching for products:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Starting Express Server
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error: ", error);
});
