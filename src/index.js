import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './ThemeContext';
import { register as registerServiceWorker } from './registerServiceWorker';
import 'leaflet/dist/leaflet.css';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker().then(() => {
  console.log('Service worker registration completed');
}).catch((error) => {
  console.error('Service worker registration failed:', error);
});