import { CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonWithLoading from "../components/ButtonWithLoading";
import { BASE_URL } from "../config";
import useHTTP from "../hooks/useHTTP";

const EditBlog = () => {
  const params = useParams();
  const navigate = useNavigate();

  // const [blog, setBlog] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`${BASE_URL}/${params.id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setBlog(res.data);
  //       setTitle(res.data.title);
  //       setDescription(res.data.description);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       navigate("/");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [params.id, navigate]);

  const {
    data: blog,
    loading,
    error,
    call,
  } = useHTTP({
    url: `${BASE_URL}/${params.id}`,
    method: "GET",
    initialValue: {},
  });

  useEffect(() => {
    call();
  }, [call]);

  useEffect(() => {
    if (Object.keys(blog).length > 0) {
      setTitle(blog.title);
      setDescription(blog.description);
    }
  }, [blog]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  const [updateLoading, setUpdateLoading] = useState(false);

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

    try {
      setUpdateLoading(true);
      const res = await axios.put(`${BASE_URL}/${params.id}`, {
        title: title,
        description: description,
        createdBy: "User",
      });
      console.log(res.data);
      toast.success("Blog updated successfully.");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong.");
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h1>Edit a blog</h1>
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
          loading={updateLoading}
          handleClick={submitHandler}
          text="Update"
          color="secondary"
        />
      </form>
    </div>
  );
};

export default EditBlog;
