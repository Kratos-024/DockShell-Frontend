import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FullscreenLayout = () => {
  return (
    <div className="fullscreen-container">
      {/* This layout is minimal, perfect for focus modes or login pages */}
      <Outlet />

      {/* A separate ToastContainer, perhaps with a different style or position */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
};
