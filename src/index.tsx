import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { getStoredFontSize, applyFontSizeClass } from "./utils/fontSize";

applyFontSizeClass(getStoredFontSize());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
