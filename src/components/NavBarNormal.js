import { Avatar, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBarNormal = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  return (
    <div
      style={{
        height: 70,
        background: "lightgray",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 60px",
      }}
    >
      <Link
        style={{
          color: "black",
          fontSize: 30,
          fontWeight: "bold",
          textDecoration: "none",
        }}
        to="/"
      >
        AppName
      </Link>
      <div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            to="/about"
          >
            About
          </Link>
          {isLoggedIn && (
            <>
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                to="/blog/new"
              >
                New
              </Link>
              <h3>Welcome {user.displayName}</h3>
              <Avatar alt={user.displayName} src={user.photoURL} />
            </>
          )}
          {!isLoggedIn ? (
            <Link
              style={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/login"
            >
              Login
            </Link>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBarNormal;
