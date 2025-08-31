import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { MainLayout } from './MainLayout';
import { FullscreenLayout } from './FullscreenLayout';
import { CtfsPage } from './pages/LabsPage';
import { CtfPage } from './pages/CtfPage';
import { UserProfilePage } from './pages/UserProfilePage';

import { AuthProvider } from './AuthContext';
import { ProtectedRoute } from './security/ProtectedRoute';
import { PrivateRoute } from './security/PrivateRoutes';

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute handleLoginClick={handleLoginClick} isModalOpen={isModalOpen} />
              }
            />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route
                path="/ctf/labs"
                element={<CtfsPage isModalOpen={isModalOpen} handleLoginClick={handleLoginClick} />}
              />
              <Route path="/p/:username" element={<UserProfilePage />} />
            </Route>

            <Route element={<FullscreenLayout />}>
              <Route
                path="/ctf/:ctfLevel/:ctfName"
                element={<CtfPage menuHandler={menuHandler} menu={menu} />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
