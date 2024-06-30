const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const orderSchema = new mongoose.Schema({
  items: Object,
  status: { type: String, default: "pending" },
  tableNumber: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

const users = [
  { username: "customer", password: "password123", role: "customer" },
  { username: "staff", password: "password456", role: "staff" },
];

const secretKey = "your_secret_key_here";

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign(
      { username: user.username, role: user.role },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Middleware to verify token and check role
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create an order
app.post("/api/orders", authenticate, async (req, res) => {
  try {
    const order = new Order({
      items: req.body.items,
      tableNumber: req.body.tableNumber,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

// Get orders (accessible by both customers and staff)
app.get("/api/orders", authenticate, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
