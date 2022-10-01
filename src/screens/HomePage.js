import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import useHTTP from "../hooks/useHTTP";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";

const HomePage = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(BASE_URL)
  //     .then((res) => {
  //       console.log(res.data);
  //       setBlogs(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setBlogs([]);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // const {
  //   data: blogs,
  //   loading,
  //   call,
  // } = useHTTP({
  //   url: BASE_URL,
  //   method: "GET",
  //   initialValue: [],
  // });

  // useEffect(() => {
  //   call();
  // }, [call]);

  const { blogs, loading, error } = useSelector((state) => state.blogState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid gray",
        margin: 10,
        padding: 10,
        height: "100%",
      }}
    >
      <h1>List of blogs</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        blogs.map((item) => (
          <BlogCard
            onClick={() => {
              navigate(`/blog/${item.id}`);
            }}
            key={item.id}
            title={item.title}
            createdBy={item.createdBy}
          />
        ))
      )}
    </div>
  );
};

export default HomePage;
