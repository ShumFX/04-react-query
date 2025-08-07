import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import 'modern-normalize/modern-normalize.css';
import './index.css';

// Створення modal-root елемента для порталу
const modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';
document.body.appendChild(modalRoot);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);