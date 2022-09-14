import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonWithLoading from "../components/ButtonWithLoading";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { isLoggedIn, login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          minWidth: 400,
        }}
      >
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={email}
          disabled
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={password}
          disabled
          onChange={(e) => setPassword(e.target.value)}
        />

        <ButtonWithLoading
          disabled={true}
          loading={false}
          handleClick={(e) => {
            e.preventDefault();
            if (
              email === process.env.REACT_APP_EMAIL &&
              password === process.env.REACT_APP_PASSWORD
            ) {
              login();
            } else {
              toast.error("Invalid credentials.");
            }
          }}
          text="Login"
        />
        <ButtonWithLoading
          loading={loading}
          handleClick={(e) => {
            e.preventDefault();
            login();
          }}
          text="Login With Google"
        />
      </form>
    </div>
  );
};

export default LoginPage;
