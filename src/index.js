import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Update the import to use the named import for the register function
import { register as registerServiceWorker } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Since register is an async function, you can call it directly without awaiting it
// If you need to handle errors or perform actions after registration, use then/catch
registerServiceWorker().then(() => {
  console.log('Service worker registration completed');
}).catch((error) => {
  console.error('Service worker registration failed:', error);
});
