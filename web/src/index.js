import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeProvider from './ThemeProvider';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
  domain={process.env.REACT_APP_AUTH0_DOMAIN || "dev-8oivjmih178u6qpg.us.auth0.com"}
  clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || "USWlBGBM57kpWY8L5g1BTwYZ2uUArTAF"}
  authorizationParams={{
    redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI || `${window.location.origin}/callback`,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE || "https://legaldoc-api"
  }}
  useRefreshTokens={true}
  cacheLocation="localstorage"
  >
    <React.StrictMode>
      <ThemeProvider>
        <React.Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <App />
        </React.Suspense>
      </ThemeProvider>
    </React.StrictMode>
  </Auth0Provider>
);
