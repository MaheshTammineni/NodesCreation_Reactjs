import React, { useState, useEffect } from "react";
import { Node } from "@antv/x6";

interface SidebarProps {
  node: Node | null;
}

const Sidebar: React.FC<SidebarProps> = ({ node }) => {
  const [label, setLabel] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (node) {
      setLabel(node.attr("label/text"));
      setBgColor(node.attr("body/fill"));
      setTextColor(node.attr("label/fill"));
    }
  }, [node]);

  const updateNode = () => {
    if (node) {
      node.attr("label/text", label);
      node.attr("body/fill", bgColor);
      node.attr("label/fill", textColor);
    }
  };

  const deleteNode = () => {
    if (node) {
      node.remove();
    }
  };

  const duplicateNode = () => {
    if (node) {
      const clone = node.clone();
      clone.translate(30, 30);
      node.model?.addNode(clone);
    }
  };
  return (
    <div className="sidebar-wrapper">
      <div className="section">
        <h3 className="section-title">Edit Node Appearance</h3>

        <div className="form-group">
          <label className="form-label">Heading</label>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Background Color</label>
          <div className="color-picker-row">
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="input color-input"
            />
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="color-picker"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Text Color</label>
        <div className="color-picker-row">
          <input
            type="text"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="input color-input"
          />
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="color-picker"
          />
        </div>
        <div className="button-group">
          <button onClick={updateNode} className="btn btn-save">
            Save changes
          </button>
          <button onClick={duplicateNode} className="btn btn-duplicate">
            Duplicate
          </button>
          <button onClick={deleteNode} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
