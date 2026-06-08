import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { AppProvider } from './context/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AppProvider>
  </StrictMode>,
);
