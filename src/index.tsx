import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { CalendarProvider } from './components/CalendarContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <CalendarProvider>
      <App />
    </CalendarProvider>
  </React.StrictMode>,
);
