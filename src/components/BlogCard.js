import { Card } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const BlogCard = ({ title, createdBy, onClick }) => {
  return (
    <Card
      onClick={onClick}
      style={{ margin: 20, padding: 20, width: 300, cursor: "pointer" }}
    >
      <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        {title}
      </div>
      <div>CreatedBy: {createdBy}</div>
    </Card>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BlogCard;
