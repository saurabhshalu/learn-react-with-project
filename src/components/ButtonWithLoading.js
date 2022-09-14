import { Button, CircularProgress } from "@mui/material";
import React from "react";

const ButtonWithLoading = (props) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color={props.color || "primary"}
      style={{ width: 200, height: 60 }}
      onClick={props.handleClick}
      disabled={props.loading || props.disabled}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <span>{props.text}</span>
        {props.loading && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
    </Button>
  );
};

export default ButtonWithLoading;
