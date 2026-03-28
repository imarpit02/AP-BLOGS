import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/userFetch";
import React from "react";
import { FaRegComment } from "react-icons/fa";

const CommentCount = ({ props }) => {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_BASE_URL")}/comment/get-count/${props.blogid}`,
    { method: "GET", withCredentials: true },
  );

  return (
    <div className="flex items-center gap-1">
      <button className="cursor-pointer">
        <FaRegComment />
      </button>
      <span>{data && data.commentCount}</span>
    </div>
  );
};

export default CommentCount;
