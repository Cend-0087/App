import React from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';

import '/index.css';

import Layout from "./layouts/Layout";
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Car from './pages/Car';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import { AuthProvider, useAuth } from './context/AuthContext';
import { HelmetProvider } from "react-helmet-async";

// ==================== GUARDS ====================

// Защищённый маршрут для авторизованных пользователей
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Загрузка...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Гостевой маршрут (только для неавторизованных)
function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Загрузка...</div>;
  if (user) return <Navigate to="/profile" replace />;
  return children;
}

// Маршрут только для администратора
function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div className="loading">Загрузка...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/profile" replace />;
  return children;
}

// Маршрут для менеджеров и администраторов
function ManagerRoute({ children }) {
  const { user, loading, isManager } = useAuth();
  if (loading) return <div className="loading">Загрузка...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isManager) return <Navigate to="/profile" replace />;
  return children;
}

// Маршрут для сотрудников, менеджеров и администраторов
function EmployeeRoute({ children }) {
  const { user, loading, isEmployee } = useAuth();
  if (loading) return <div className="loading">Загрузка...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isEmployee) return <Navigate to="/profile" replace />;
  return children;
}

// ==================== APP ====================

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="cars/:id" element={<Car />} />
              
              {/* Гостевые страницы */}
              <Route 
                path="login" 
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                } 
              />
              <Route 
                path="register" 
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                } 
              />
              
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />

              {/* Защищённые страницы */}
              <Route 
                path="profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

              {/* Административные страницы (пока только заглушка) */}
              <Route 
                path="admin" 
                element={
                  <AdminRoute>
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                      <h1>Админ-панель</h1>
                      <p>Здесь будет дашборд администратора.</p>
                      <p>Пока доступ только у пользователей с ролью <strong>admin</strong>.</p>
                    </div>
                  </AdminRoute>
                } 
              />

              {/* Дополнительные страницы */}
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);