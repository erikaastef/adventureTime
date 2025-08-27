import React from "react";
import { Routes, Route } from "react-router-dom";

import Welcome from "./Welcome/Welcome";
import Game from "./Game/Game";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}
export default App;
