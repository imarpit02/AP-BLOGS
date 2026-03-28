import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/userFetch";
import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const Index = () => {
  const { data: blogData, loading } = useFetch(
    `${getEnv("VITE_BASE_URL")}/blog/blogs`,
    { method: "GET", withCredentials: true },
  );

  if (loading) return <Loading />;
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-8"
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

export default Index;
