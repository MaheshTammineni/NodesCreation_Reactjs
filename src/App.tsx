/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import GraphCanvas from './components/GraphCanvas';
import Sidebar from './components/Sidebar';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  return (
    <div className="app-container">
    <header className="app-header">
      <h1 className="header-title">Graph</h1>
    </header>
    <main className="app-main">
      <div className="canvas-container">
        <GraphCanvas onNodeSelect={setSelectedNode} />
      </div>
      <div className="sidebar-container">
        <Sidebar node={selectedNode} />
      </div>
    </main>
  </div>
  );
}