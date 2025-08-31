import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FullscreenLayout = () => {
  return (
    <div className="fullscreen-container">
      <Outlet />

      <ToastContainer position="bottom-center" autoClose={3000} theme="colored" />
    </div>
  );
};
