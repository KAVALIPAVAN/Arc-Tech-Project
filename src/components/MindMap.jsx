import React, { useEffect } from "react";
import ReactFlow, { Controls } from "reactflow";
import "reactflow/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../context/store";
import dagre from "dagre";
import { Link } from "react-router-dom";

const MindMap = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData()); // Fetch data on mount
  }, [dispatch]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;
  if (!data.length) return <p style={{ textAlign: "center" }}>No data available</p>;

  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB" }); // "TB" = Top to Bottom (Vertical)

  const nodes = [];
  const edges = [];
  const userIds = [...new Set(data.map((item) => item.userId))];

  userIds.forEach((userId) => {
    const rootNodeId = `user-${userId}`;
    nodes.push({
      id: rootNodeId,
      data: { label: `User ${userId}` },
      position: { x: 0, y: 0 }, // Will be auto-positioned by Dagre
      style: { background: "#1976d2", color: "#fff", padding: 10, borderRadius: 8 },
    });

    data
      .filter((task) => task.userId === userId)
      .forEach((task) => {
        const taskNodeId = `task-${task.id}`;
        nodes.push({
          id: taskNodeId,
          data: { label: `${task.title} ${task.completed ? "✅" : "❌"}` },
          position: { x: 0, y: 0 }, // Auto-position
          style: {
            background: task.completed ? "#4caf50" : "#f44336",
            color: "#fff",
            padding: 10,
            borderRadius: 8,
          },
        });

        edges.push({ id: `edge-${task.id}`, source: rootNodeId, target: taskNodeId });
      });
  });

  // Ensure that the graph is only configured with valid nodes and edges
  nodes.forEach((node) => g.setNode(node.id, { width: 200, height: 50 }));
  edges.forEach((edge) => {
    // Ensure the edge source and target are valid before setting the edge
    if (edge.source && edge.target) {
      g.setEdge(edge.source, edge.target);
    } else {
      console.warn(`Invalid edge: ${JSON.stringify(edge)}`);
    }
  });

  // Run the Dagre layout algorithm
  try {
    dagre.layout(g);
  } catch (e) {
    console.error("Error during Dagre layout:", e);
  }

  // Adjust node positions after layout
  const positionedNodes = nodes.map((node) => {
    const { x, y } = g.node(node.id);  // Get position after layout
    return { ...node, position: { x, y } };
  });

  return (<>
  <Link className="btn" href="/">Home</Link>
    <div style={{ width: "100%", height: "500px", border: "1px solid #ddd", borderRadius: 8 }}>
        
      <ReactFlow nodes={positionedNodes} edges={edges} fitView>
        <Controls />
      </ReactFlow>
    </div>
    </>
  );
};

export default MindMap;
