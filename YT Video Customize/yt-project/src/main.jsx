 
import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import './index.css'; // Your global styles if any
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
