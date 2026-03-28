import Comment from "@/components/Comment";
import CommentCount from "@/components/CommentCount";
import LikeCount from "@/components/LikeCount";
import Loading from "@/components/Loading";
import RelatedBlogs from "@/components/RelatedBlogs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getEnv } from "@/helpers/getEnv";
import { RouteIndex } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/userFetch";
import { decode } from "entities";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";
import userIcon from "@/assets/images/user.png";

const SeeBlogDetails = () => {
  const { blog, category } = useParams();

  const { data, loading } = useFetch(
    `${getEnv("VITE_BASE_URL")}/blog/get-blog/${blog}`,
    { method: "GET", withCredentials: true },
    [blog, category],
  );

  if (loading) return <Loading />;

  return (
    <div>
      <div className="mb-3">
        <Button asChild variant="outline">
          <Link to={RouteIndex}>&lt;&nbsp;&nbsp;Go Back</Link>
        </Button>
      </div>
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20">
        {data && data.blog && (
          <div className="w-full rounded border p-5 lg:w-[70%]">
            <h1 className="mb-3 text-lg font-bold sm:text-xl lg:mb-5 lg:text-2xl">
              {data.blog.title}
            </h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:gap-4">
              <div className="flex items-center gap-3 lg:gap-5">
                <Avatar>
                  <AvatarImage src={data.blog.author.avatar || userIcon} />
                </Avatar>
                <div>
                  <p className="lg:text-medium text-sm font-bold">
                    {data.blog.author.name}
                  </p>
                  <p className="text-xs text-gray-500 lg:text-sm">
                    Posted on:{" "}
                    {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-4">
                <LikeCount props={{ blogid: data.blog._id }} />
                <CommentCount props={{ blogid: data.blog._id }} />
              </div>
            </div>
            <div className="mt-5 lg:my-5">
              <img
                src={data.blog.featuredImage}
                alt=""
                className="h-50 w-full rounded object-cover sm:h-75 lg:h-100"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decode(data.blog.blogContent) || "",
              }}
            />
            <div className="mt-5 border-t pt-5">
              <Comment props={{ blogid: data.blog._id }} />
            </div>
          </div>
        )}
        <div className="h-fit rounded border p-5 lg:w-[30%]">
          <RelatedBlogs props={{ category: category, currentBlog: blog }} />
        </div>
      </div>
    </div>
  );
};

export default SeeBlogDetails;
