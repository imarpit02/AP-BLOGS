import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/userFetch";
import { motion } from "framer-motion";
import React from "react";
import { useParams } from "react-router-dom";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const BlogsByCategory = () => {
  const { category } = useParams();
  const { data: blogData, loading } = useFetch(
    `${getEnv("VITE_BASE_URL")}/blog/get-blogs-by-category/${category}`,
    { method: "GET", withCredentials: true },
    [category],
  );

  if (loading) return <Loading />;
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {blogData && blogData.blog.length > 0 ? (
        blogData.blog.map((blog) => <BlogCard props={blog} key={blog._id} />)
      ) : (
        <div className="col-span-3 flex h-120 items-center justify-center">
          <p className="text-2xl font-semibold text-gray-500">Data not found</p>
        </div>
      )}
    </motion.div>
  );
};

export default BlogsByCategory;
