import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/login";
import Workspace from "../src/components/Workspace";

import ProtectedRoute from "../src/components/ProtectedRoute";

function App() {
  <Route path="/" element={<Login />} />
  return (
    <BrowserRouter>

      <Routes>

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

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

