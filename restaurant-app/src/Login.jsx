import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBySP-7q-V2FBbCz9cz3lPH6wLaA5MPtkc",
  authDomain: "restaurant-app2-abe71.firebaseapp.com",
  projectId: "restaurant-app2-abe71",
  storageBucket: "restaurant-app2-abe71.appspot.com",
  messagingSenderId: "28022398225",
  appId: "1:28022398225:web:2153797820dfc4481dc0b0",
  measurementId: "G-2CY601R2TP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/menu");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 450,
          backgroundColor: "#f9f9f9",
          padding: 40,
          border: "1px solid #ccc",
          borderRadius: 10,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "75%", height: 40, marginBottom: 20 }}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "75%", height: 40, marginBottom: 20 }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: 10,
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
