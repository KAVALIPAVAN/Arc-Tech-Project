import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainApp from "./MainApp";
import MindMap from "./components/MindMap";


const App = () => {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/mindmap" element={<MindMap />}>
        
      </Route>
    </Routes>
  </BrowserRouter>
  </>
};

export default App;
