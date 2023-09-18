import React, { createContext, useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import { Toaster } from "react-hot-toast";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="vh-100 gradient-custom">
      <div className="container mt-5">
        <Toaster />
        <AuthContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/edit" element={<EditPage />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
