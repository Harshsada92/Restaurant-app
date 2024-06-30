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
const Order = ({ items }) => {
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
      <h1>Your Order</h1>
      {items && Object.entries(items).length > 0 ? (
        <ul>
          {Object.entries(items).map(([itemName, quantity]) => (
            <li key={itemName}>
              {itemName}: {quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in your order</p>
      )}
    </div>
  );
};

export default Order;
