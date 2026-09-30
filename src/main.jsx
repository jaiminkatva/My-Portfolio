import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const isAdmin = window.location.hash === '#/admin'
  || window.location.pathname === `${basePath}/admin`
  || window.location.pathname.startsWith(`${basePath}/admin/`);
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdmin ? (
      <Suspense fallback={<div className="grid min-h-screen place-items-center bg-ink-900 font-mono text-sm text-paper-faint">Loading admin…</div>}>
        <AdminApp />
      </Suspense>
    ) : <App />}
  </React.StrictMode>
);
