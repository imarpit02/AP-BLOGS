import React from "react";
import loadingIcon from "@/assets/images/loading.svg";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center">
      <img src={loadingIcon} alt="Loading..." width={100} />
    </div>
  );
};

export default Loading;
