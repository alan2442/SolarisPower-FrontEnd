import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * Ponto de entrada (Entry Point) da aplicação React da SolarisPower.
 * Renderiza o componente raiz `App` dentro da árvore `StrictMode` do React 18/19 no elemento DOM 'root'.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);