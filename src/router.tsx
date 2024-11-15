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
import GeneralError from './pages/errors/general-error';
import MaintenanceError from './pages/errors/maintenance-error';
import NotFoundError from './pages/errors/not-found-error';
import UnauthorizedError from './pages/errors/unauthorized-error.tsx';
import LandingPage from './pages/landing-page/index.tsx';
import UserProducts from './pages/user/products/index.tsx';
import UserSupplier from './pages/user/suppliers/index.tsx';

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
          <Route path="user" element={<AppShell />}>
            <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="products" element={<ProtectedRoute><UserProducts /></ProtectedRoute>} />
            <Route path="suppliers" element={<ProtectedRoute><UserSupplier /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="orders/:id" element={<ProtectedRoute><AddOrderPage /></ProtectedRoute>} />
          </Route>
          {/* <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} /> */}
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
