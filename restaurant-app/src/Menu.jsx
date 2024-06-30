import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  {
    category: "Appetizers",
    items: [
      {
        name: "Bruschetta",
        description: "Grilled bread with tomatoes",
        price: "Rs500",
        image: "bruschetta.jpg",
      },
      {
        name: "Stuffed Mushrooms",
        description: "Mushrooms stuffed with cheese",
        price: "Rs700",
        image: "mushrooms.jpg",
      },
    ],
  },
  {
    category: "Main Courses",
    items: [
      {
        name: "Grilled Salmon",
        description: "Salmon with herbs",
        price: "Rs500",
        image: "salmon.jpg",
      },
      {
        name: "Steak",
        description: "Juicy grilled steak",
        price: "Rs800",
        image: "steak.jpg",
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Cheesecake",
        description: "Creamy cheesecake with berries",
        price: "Rs60",
        image: "cheesecake.jpg",
      },
      {
        name: "Chocolate Cake",
        description: "Rich chocolate cake",
        price: "Rs600",
        image: "chocolate-cake.jpg",
      },
    ],
  },
  {
    category: "Drinks",
    items: [
      {
        name: "Lemonade",
        description: "Freshly squeezed lemonade",
        price: "Rs150",
        image: "lemonade.jpg",
      },
      {
        name: "Iced Tea",
        description: "Refreshing iced tea",
        price: "Rs150",
        image: "iced-tea.jpg",
      },
    ],
  },
];

const Menu = () => {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  const handleAddToCart = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId]--;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("/api/orders", { items: cart });
      console.log("Order placed:", response.data);
      setCart({});
      navigate("/order"); // Navigate to Order page after placing order
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div>
            <Link
              to="/order"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "20px",
              }}
            >
              <Typography variant="h6" style={{ display: "inline-block" }}>
                My Order
              </Typography>
            </Link>
            <Link to="/menu" style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="h6" style={{ display: "inline-block" }}>
                Menu
              </Typography>
            </Link>
          </div>
          <IconButton edge="end" color="inherit"></IconButton>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ padding: "16px" }}>
        {menuItems.map((category) => (
          <Grid item xs={12} key={category.category}>
            <Typography variant="h5" style={{ margin: "16px 0" }}>
              {category.category}
            </Typography>
            <Grid container spacing={2}>
              {category.items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.name}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                      <Typography variant="subtitle1">{item.price}</Typography>
                      <Button onClick={() => handleAddToCart(item.name)}>
                        +
                      </Button>
                      {cart[item.name] && (
                        <span style={{ marginLeft: "10px" }}>
                          {cart[item.name]}
                        </span>
                      )}
                      <Button onClick={() => handleRemoveFromCart(item.name)}>
                        -
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
};

export default Menu;
