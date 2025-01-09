import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        {/* Correct usage of Route */}
        <Route path="/login" element={<Login />} />

        {/* Optionally add a default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
