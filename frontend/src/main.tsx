import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { store } from './store/store';
import ProtectedRoute from './components/ProtectedRoutes.tsx';
import AuthPage from './components/AuthPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthPage />} />;
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<App />} />;
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
