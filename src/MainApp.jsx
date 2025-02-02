import React from "react";
import ResponsiveTable from "./components/ResponsiveTable";
import './App.css'
import { Link } from "react-router-dom";

const MainApp = () => {
  return <div>
    <Link to="/mindmap" className="btn">MindMap</Link>
    <ResponsiveTable/>
    </div>;
};

export default MainApp;
