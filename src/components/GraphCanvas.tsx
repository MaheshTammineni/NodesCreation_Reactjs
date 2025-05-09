/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Graph, Node } from '@antv/x6';

interface GraphCanvasProps {
  onNodeSelect: (node: Node | null) => void;
}

const GraphCanvas: React.FC<GraphCanvasProps> = ({ onNodeSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<Graph | null>(null);

  console.log(graph);
  useEffect(() => {
    if (!containerRef.current) return;

    const g = new Graph({
      container: containerRef.current,
      width: 1000,
      height: 800,
      grid: true,
      connecting: {
        router: 'manhattan',
        connector: 'rounded',
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: true,
        highlight: true,
        validateConnection({ targetMagnet }) {
          return !!targetMagnet; // Allow connection only if there’s a magnet
        },
      },
      background: { color: '#f5f5f5' },
    });

    setGraph(g);

    const addNode = (type: string) => {
        let width = 260;
        let height = 180;
        if (type === 'Text') {
            width = 400;
            height = 600;
          }
      
          if (type === 'Block') {
              width = 300;
              height = 350;
            }
      
      const node = g.addNode({
        shape: 'rect',
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
        width,
        height,
        data: { type },
        attrs: {
          label: {
            text: type === 'Note' ? "Note" : type,
            fill: type === 'Note' ? '#000' : '#fff',
            fontSize: 14,
          },
          body: {
            fill: type === 'Note' ? '#fffbe6' : type === 'Block' ? '#facc15' : '#1e40af',
            stroke: '#000',
          },
          
        },
        ports: {
          groups: {
            top: { position: 'top', attrs: { circle: { r: 6, magnet: true, stroke: '#000', fill: '#fff' } } },
            bottom: { position: 'bottom', attrs: { circle: { r: 6, magnet: true, stroke: '#000', fill: '#fff' } } },
          },
          items: [
            { id: 'port1', group: 'top' },
            { id: 'port2', group: 'bottom' },
          ],
        },
      });

      return node;
    };

    document.getElementById('text-btn')?.addEventListener('click', () => addNode('Text'));
    document.getElementById('block-btn')?.addEventListener('click', () => addNode('Block'));
    document.getElementById('note-btn')?.addEventListener('click', () => addNode('Note'));

    g.on('node:click', ({ node }) => onNodeSelect(node));

    (window as any).graph = g;
  }, [onNodeSelect]);

  return (
    <div className="flex">
      <div className="flex flex-col p-2 space-y-2">
        <button id="text-btn" className="border px-2 py-1">Text</button>
        <button id="block-btn" className="border px-2 py-1">Block</button>
        <button id="note-btn" className="border px-2 py-1">Note</button>
      </div>
      <div ref={containerRef} className="border ml-2" style={{ flex: 1 }} />
    </div>
  );
};

export default GraphCanvas;
