import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-center" toastOptions={{ style: { background: '#171717', color: '#fff', borderRadius: 0, fontSize: 13, padding: '13px 18px' } }} />
    </BrowserRouter>
  </React.StrictMode>
);
