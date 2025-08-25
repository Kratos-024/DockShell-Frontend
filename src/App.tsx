import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CtfsPage } from "./pages/CtfsPage";
import { CtfPage } from "./pages/CtfPage";
import { useState } from "react";
import { UserProfilePage } from "./pages/UserProfilePage";

function App() {
  const [menu, setMenu] = useState<boolean>(true);
  const menuHandler = () => {
    setMenu(!menu);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/"></Route>
        <Route element={<CtfsPage />} path="/ctf"></Route>
        <Route
          element={<CtfPage menuHandler={menuHandler} menu={menu} />}
          path="/ctf/:ctfLevel/:ctfName"
        ></Route>
        <Route element={<UserProfilePage />} path="/p/:username"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
