import { TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import ButtonWithLoading from "../components/ButtonWithLoading";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

const CreateBlog = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setTitleError("");
    setDescError("");
    if (!title || !description) {
      if (!title) {
        setTitleError("Please enter title");
      }
      if (!description) {
        setDescError("Please enter description");
      }
      return;
    }

    //API
    // axios
    //   .post(BASE_URL, {
    //     title: title,
    //     description: description,
    //     createdBy: "User",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    try {
      setLoading(true);
      const res = await axios.post(BASE_URL, {
        title: title,
        description: description,
        createdBy: isLoggedIn ? user.displayName : "user",
      });
      console.log(res.data);
      setTitle("");
      setDescription("");
      toast.success("Blog created successfully.");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong.");
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Create a blog</h1>
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
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError ? true : false}
          helperText={titleError}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={descError ? true : false}
          helperText={descError}
        />
        <ButtonWithLoading
          loading={loading}
          handleClick={submitHandler}
          text="Submit"
        />
      </form>
    </div>
  );
};

export default CreateBlog;
