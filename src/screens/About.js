import React from "react";
import BlogCard from "../components/BlogCard";
import withTimeStamp from "../hocs/withTimeStamp";

const AboutPage = () => {
  return (
    <div>
      {withTimeStamp(
        <BlogCard title="This is awesome!" createdBy="Saurabh Verma" />
      )}
    </div>
  );
};

export default AboutPage;
