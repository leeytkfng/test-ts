// Vite 프로젝트의 index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import App from "./App"; // App 컴포넌트 import

// CSS 파일 import
import "./index.css";

// Vite에서 React 18+의 새로운 root API 사용
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
