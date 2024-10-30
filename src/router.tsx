import ProtectedRoute from '@/middlewares/ProtectedRoute.tsx';
import { Suspense, lazy } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import GeneralError from './pages/errors/general-error';
import MaintenanceError from './pages/errors/maintenance-error';
import NotFoundError from './pages/errors/not-found-error';
import UnauthorizedError from './pages/errors/unauthorized-error.tsx';
import Settings from './pages/settings/index.tsx';

// Lazy load components
const SignIn = lazy(() => import('./pages/auth/sign-in.tsx'));
const SignUp = lazy(() => import('./pages/auth/sign-up.tsx'));
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
const AppShell = lazy(() => import('./components/app-shell'));
const LandingPage = lazy(() => import('./pages/landing-page/index.tsx'));
const Dashboard = lazy(() => import('@/pages/admin/dashboard'));
const Tasks = lazy(() => import('@/pages/tasks'));
const Products = lazy(() => import('@/pages/admin/products'));
const AddProductPage = lazy(() => import('@/pages/admin/products/add.tsx'));
const Suppliers = lazy(() => import('@/pages/admin/suppliers'));
const AddSupplierPage = lazy(() => import('@/pages/admin/suppliers/add.tsx'));
const Clients = lazy(() => import('@/pages/admin/clients'));
const AddClientPage = lazy(() => import('@/pages/admin/clients/add'));
const Apps = lazy(() => import('@/pages/apps'));
const Chats = lazy(() => import('@/pages/chats'));
const ExtraComponents = lazy(() => import('@/pages/extra-components'));
const Account = lazy(() => import('./pages/settings/account'));
const Profile = lazy(() => import('./pages/settings/profile'));

const AppRouter = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="admin" element={<AppShell />}>
            <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="product/:id" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
            <Route path="suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
            <Route path="suppliers/:id" element={<ProtectedRoute><AddSupplierPage /></ProtectedRoute>} />
            <Route path="clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
            <Route path="clients/:id" element={<ProtectedRoute><AddClientPage /></ProtectedRoute>} />
          </Route>
          <Route path="general" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
          <Route path="apps" element={<ProtectedRoute><Apps /></ProtectedRoute>} />
          {/* <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} /> */}
          <Route path="extra-components" element={<ProtectedRoute><ExtraComponents /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Route>
        </Route>
        <Route path="/500" element={<GeneralError />} />
        <Route path="/404" element={<NotFoundError />} />
        <Route path="/503" element={<MaintenanceError />} />
        <Route path="/401" element={<UnauthorizedError />} />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;
