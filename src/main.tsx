import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'

// Mount into WordPress container or fallback to root
const rootElement = document.getElementById('gold-terminal-root') || document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
  );
} else {
  console.error('Altın Masası: Mount element not found. Please ensure #gold-terminal-root or #root exists.');
}
