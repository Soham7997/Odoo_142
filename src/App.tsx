import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/pages/auth/Signup";
import Login from "./components/pages/auth/Login";
import Homepage from "./components/pages/mainpages/Homepage";
import MainPage from "./components/pages/mainpages/MainPage";


import { userStore } from "./lib/context";
import FileUpload from "./components/helpers/FileUpload";
function App() {
  const user = userStore((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={!user ? <Homepage /> : <Navigate to="/main" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/main" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/main" />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/fileupload" element={<FileUpload/>}/>
    </Routes>
  );
}

export default App;
