import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  RouteAddBlog,
  RouteAddCategory,
  RouteBlog,
  RouteBlogDetails,
  RouteBlogsByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteEditBlog,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  Routesearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./helpers/RouteName";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AddCategory from "./pages/category/AddCategory";
import CategoryDetails from "./pages/category/CategoryDetails";
import EditCategory from "./pages/category/EditCategory";
import AddBlog from "./pages/blog/AddBlog";
import BlogDetails from "./pages/blog/BlogDetails";
import EditBlog from "./pages/blog/EditBlog";
import SeeBlogDetails from "./pages/SeeBlogDetails";
import BlogsByCategory from "./pages/blog/BlogsByCategory";
import Search from "./pages/Search";
import CommentDetails from "./pages/CommentDetails";
import Users from "./pages/Users";
import AuthRouteProtection from "./components/AuthRouteProtection";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />

          <Route path={RouteBlogDetails()} element={<SeeBlogDetails />} />
          <Route path={RouteBlogsByCategory()} element={<BlogsByCategory />} />

          <Route path={Routesearch()} element={<Search />} />

          <Route element={<AuthRouteProtection />}>
            <Route path={RouteAddBlog} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteEditBlog()} element={<EditBlog />} />
            <Route path={RouteCommentDetails} element={<CommentDetails />} />
            <Route path={RouteProfile} element={<Profile />} />
          </Route>

          <Route element={<OnlyAdminAllowed />}>
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            <Route path={RouteUser} element={<Users />} />
          </Route>
        </Route>
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
