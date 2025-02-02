import React from "react";
import ResponsiveTable from "./components/ResponsiveTable";
import './App.css'

const MainApp = () => {
  return <div>
    <a href="/mindmap" className="btn">MindMap</a>
    <ResponsiveTable/>
    </div>;
};

export default MainApp;
