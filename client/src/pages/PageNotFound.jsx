import { Button } from "@/components/ui/button";
import { RouteIndex } from "@/helpers/RouteName";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-red-500">
          404 <span className="font-normal">|</span>
        </h1>
        <p className="mt-2 text-xl">Page Not Found</p>
      </div>
      <Button asChild className="text-md h-11 w-40">
        <Link to={RouteIndex}>Go Back Home</Link>
      </Button>
    </div>
  );
};

export default PageNotFound;
