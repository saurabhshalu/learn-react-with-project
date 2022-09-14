import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonWithLoading from "../components/ButtonWithLoading";
import { BASE_URL } from "../config";
import useHTTP from "../hooks/useHTTP";
import { fetchBlogById } from "../redux/blogSlice";
const Blog = () => {
  const params = useParams();
  const navigate = useNavigate();

  // const [blog, setBlog] = useState({});
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`${BASE_URL}/${params.id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setBlog(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       navigate("/");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [params.id, navigate]);

  // const {
  //   data: blog,
  //   loading,
  //   error,
  //   call,
  // } = useHTTP({
  //   url: `${BASE_URL}/${params.id}`,
  //   method: "GET",
  //   initialValue: {},
  // });

  // useEffect(() => {
  //   call();
  // }, [call]);

  const { blog, loading, error } = useSelector((state) => state.blogState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogById(params.id));
  }, [dispatch, params.id]);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteHandler = () => {
    //AXIOS
    setDeleteLoading(true);
    axios
      .delete(`${BASE_URL}/${params.id}`)
      .then((res) => {
        toast.success("Blog deleted successfully.");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Something went wrong while deleting the blog.");
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      <p>Created by: {blog.createdBy}</p>
      <ButtonWithLoading
        text="Delete"
        loading={deleteLoading}
        handleClick={deleteHandler}
        color="error"
      />
      &nbsp;
      <ButtonWithLoading
        text="Update"
        handleClick={() => {
          navigate(`/blog/edit/${blog.id}`);
        }}
        color="secondary"
      />
    </div>
  );
};

export default Blog;
