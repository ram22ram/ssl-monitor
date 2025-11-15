import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Netlify Identity Widget ko import karein
import netlifyIdentity from 'netlify-identity-widget';

// Netlify Identity ko chalu (initialize) karein
// Yeh line zaroori hai taaki login popup kaam kar sake
netlifyIdentity.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);