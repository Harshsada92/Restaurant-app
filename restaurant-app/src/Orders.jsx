import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleMarkAsCompleted = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}/complete`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error marking order as completed:", error);
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
      <div style={{ padding: "16px" }}>
        <Typography variant="h4">Incoming Orders</Typography>
        <List>
          {orders.map((order) => (
            <ListItem key={order._id} divider>
              <ListItemText
                primary={`Table ${order.tableNumber}`}
                secondary={`Items: ${order.items
                  .map((item) => `${item.name} x${item.quantity}`)
                  .join(", ")} | Total: $${order.totalAmount}`}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleMarkAsCompleted(order._id)}
              >
                Mark as Completed
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Orders;
