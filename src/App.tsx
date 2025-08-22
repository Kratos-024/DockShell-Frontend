import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CtfPage } from "./pages/CtfPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/"></Route>
        <Route element={<CtfPage />} path="/ctf"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
