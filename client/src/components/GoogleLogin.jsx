import React from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/firebase";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteIndex } from "@/helpers/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await axios.post(
        `${getEnv("VITE_BASE_URL")}/auth/google-login`,
        bodyData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      showToast("success", response.data.message);
      dispatch(setUser(response.data.user));
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.response?.data?.message || error.message);
    }
  };

  return (
    <Button onClick={handleLogin} variant="outline" className="w-full">
      <FcGoogle />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;
