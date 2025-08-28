import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CtfsPage } from "./pages/CtfsPage";
import { CtfPage } from "./pages/CtfPage";
import { useState } from "react";
import { UserProfilePage } from "./pages/UserProfilePage";
import { MainLayout } from "./MainLayout";
import { FullscreenLayout } from "./FullscreenLayout";

function App() {
  const [menu, setMenu] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuHandler = () => {
    setMenu(!menu);
  };
  const handleLoginClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <HomePage
                handleLoginClick={handleLoginClick}
                isModalOpen={isModalOpen}
              />
            }
          />
          <Route path="/ctf" element={<CtfsPage />} />
          <Route path="/p/:username" element={<UserProfilePage />} />
        </Route>

        <Route element={<FullscreenLayout />}>
          <Route
            path="/ctf/:ctfLevel/:ctfName"
            element={<CtfPage menuHandler={menuHandler} menu={menu} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
