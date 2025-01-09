import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen">
      <Routes>
        {/* Correct usage of Route */}
        <Route path="/login" element={<Login />} />

        {/* Default route to redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
