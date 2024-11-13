import ProtectedRoute from '@/middlewares/ProtectedRoute.tsx';
import { Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import AppShell from './components/app-shell.tsx';
import Loader from './components/loader.tsx';
import AddClientPage from './pages/admin/clients/add.tsx';
import Clients from './pages/admin/clients/index.tsx';
import Dashboard from './pages/admin/dashboard/index.tsx';
import AddOrderPage from './pages/admin/orders/add.tsx';
import Orders from './pages/admin/orders/index.tsx';
import AddProductPage from './pages/admin/products/add.tsx';
import Products from './pages/admin/products/index.tsx';
import AddSupplierPage from './pages/admin/suppliers/add.tsx';
import Supplier from './pages/admin/suppliers/index.tsx';
import AddUserPage from './pages/admin/users/add.tsx';
import Users from './pages/admin/users/index.tsx';
import ForgotPassword from './pages/auth/forgot-password.tsx';
import SignIn from './pages/auth/sign-in.tsx';
import SignUp from './pages/auth/sign-up.tsx';
import Chats from './pages/chats/index.tsx';
import GeneralError from './pages/errors/general-error';
import MaintenanceError from './pages/errors/maintenance-error';
import NotFoundError from './pages/errors/not-found-error';
import UnauthorizedError from './pages/errors/unauthorized-error.tsx';
import ExtraComponents from './pages/extra-components/index.tsx';
import LandingPage from './pages/landing-page/index.tsx';
import { AccountForm } from './pages/settings/account/account-form.tsx';
import Settings from './pages/settings/index.tsx';
import ProfileForm from './pages/settings/profile/profile-form.tsx';
import Tasks from './pages/tasks/index.tsx';

// Lazy load components
// const SignIn = lazy(() => import('./pages/auth/sign-in.tsx'));
// const SignUp = lazy(() => import('./pages/auth/sign-up.tsx'));
// const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
// const AppShell = lazy(() => import('./components/app-shell'));
// const LandingPage = lazy(() => import('./pages/landing-page/index.tsx'));
// const Dashboard = lazy(() => import('@/pages/admin/dashboard'));
// const Tasks = lazy(() => import('@/pages/tasks'));
// const Products = lazy(() => import('@/pages/admin/products'));
// const AddProductPage = lazy(() => import('@/pages/admin/products/add.tsx'));
// const Suppliers = lazy(() => import('@/pages/admin/suppliers'));
// const AddSupplierPage = lazy(() => import('@/pages/admin/suppliers/add.tsx'));
// const Clients = lazy(() => import('@/pages/admin/clients'));
// const AddClientPage = lazy(() => import('@/pages/admin/clients/add'));
// const Apps = lazy(() => import('@/pages/apps'));
// const Chats = lazy(() => import('@/pages/chats'));
// const ExtraComponents = lazy(() => import('@/pages/extra-components'));
// const Account = lazy(() => import('./pages/settings/account'));
// const Profile = lazy(() => import('./pages/settings/profile'));

const AppRouter = () => (
  <Router>
    <Suspense fallback={<Loader />}>
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
            <Route path="suppliers" element={<ProtectedRoute><Supplier /></ProtectedRoute>} />
            <Route path="suppliers/:id" element={<ProtectedRoute><AddSupplierPage /></ProtectedRoute>} />
            <Route path="clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
            <Route path="clients/:id" element={<ProtectedRoute><AddClientPage /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path="users/:id" element={<ProtectedRoute><AddUserPage /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="orders/:id" element={<ProtectedRoute><AddOrderPage /></ProtectedRoute>} />
          </Route>
          <Route path="general" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
          {/* <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} /> */}
          <Route path="extra-components" element={<ProtectedRoute><ExtraComponents /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute><ProfileForm /></ProtectedRoute>} />
            <Route path="account" element={<ProtectedRoute><AccountForm /></ProtectedRoute>} />
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
