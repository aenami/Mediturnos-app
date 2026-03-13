import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "../src/components/Workspace";
import Login from "./pages/login";
import Register from "./pages/register";

import ProtectedRoute from "../src/components/ProtectedRoute";

function App() {
  
  return (
    <BrowserRouter>

      <Routes>

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        <Route path="register" element={<Register />} />

        {/* Ruta protegida */}
        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Login />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

