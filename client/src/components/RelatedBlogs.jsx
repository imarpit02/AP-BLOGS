import { getEnv } from "@/helpers/getEnv";
import { RouteBlogDetails } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/userFetch";
import React from "react";
import { Link } from "react-router-dom";

const RelatedBlogs = ({ props }) => {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_BASE_URL")}/blog/get-related-blogs/${props.category}/${props.currentBlog}`,
    { method: "GET", withCredentials: true },
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold">Related Blogs</h2>
      <div>
        {data && data.relatedBlogs.length > 0 ? (
          data.relatedBlogs.map((blog) => (
            <Link
              key={blog._id}
              to={RouteBlogDetails(props.category, blog.slug)}
            >
              <div className="mb-3 flex cursor-pointer items-center gap-2 rounded-sm border-b p-2 pb-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs">
                <img
                  src={blog.featuredImage}
                  alt=""
                  className="h-18 w-25 rounded-md object-cover"
                />
                <h4 className="line-clamp-2 font-semibold">{blog.title}</h4>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <h4 className="text-lg text-gray-500">No Related Blogs Found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedBlogs;
