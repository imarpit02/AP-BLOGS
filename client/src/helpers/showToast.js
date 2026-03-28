import { toast } from "react-toastify";

export const showToast = (type, message) => {
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

  const config = {
    position: isMobile ? "top-center" : "top-right",
    autoClose: 3000,
    hideProgressBar: isMobile,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    style: {
      width: isMobile ? "300px" : isTablet ? "250px" : "350px",
      margin: "auto",
      fontSize: isMobile ? "14px" : "15px",
    },
  };

  if (type === "success") {
    toast.success(message, config);
  } else if (type === "error") {
    toast.error(message, config);
  } else if (type === "info") {
    toast.info(message, config);
  } else {
    toast(message, config);
  }
};
