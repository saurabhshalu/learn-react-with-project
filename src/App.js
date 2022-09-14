import React, { useContext } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import AboutPage from "./screens/About";
import Blog from "./screens/Blog";
import EditBlog from "./screens/EditBlog";
import CreateBlog from "./screens/CreateBlog";
import NavBarNormal from "./components/NavBarNormal";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <NavBarNormal />
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/blog/new" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} /> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/blog">
              <Route path="new" element={<CreateBlog />} />
              <Route path=":id" element={<Blog />} />
              <Route path="edit/:id" element={<EditBlog />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
