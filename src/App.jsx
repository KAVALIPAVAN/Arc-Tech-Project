import React from "react";
import {  Router, Route, Routes } from 'react-router-dom';
import MainApp from "./MainApp";
import MindMap from "./components/MindMap";


const App = () => {
  return <>
{/* <Router> */}
<Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/mindmap" element={<MindMap />}>
        
      </Route>
    </Routes>
{/* </Router> */}

  
  </>
};

export default App;
