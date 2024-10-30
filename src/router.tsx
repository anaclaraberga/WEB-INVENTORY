import ProtectedRoute from '@/middlewares/ProtectedRoute.tsx';
import Clients from '@/pages/admin/clients';
import AddClientPage from '@/pages/admin/clients/add';
import Dashboard from '@/pages/admin/dashboard';
import Products from '@/pages/admin/products';
import AddProductPage from '@/pages/admin/products/add.tsx';
import Suppliers from '@/pages/admin/suppliers';
import AddSupplierPage from '@/pages/admin/suppliers/add.tsx';
import Apps from '@/pages/apps';
import Chats from '@/pages/chats';
import ExtraComponents from '@/pages/extra-components';
import Tasks from '@/pages/tasks';
import { Settings, Users } from 'lucide-react';
import { createBrowserRouter } from 'react-router-dom';
import GeneralError from './pages/errors/general-error';
import MaintenanceError from './pages/errors/maintenance-error';
import NotFoundError from './pages/errors/not-found-error';
import UnauthorizedError from './pages/errors/unauthorized-error.tsx';
import Account from './pages/settings/account';
import Profile from './pages/settings/profile';

const router = createBrowserRouter([
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell');
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        path: 'admin',
        lazy: async () => {
          const AppShell = await import('./components/app-shell');
          return { Component: AppShell.default };
        },
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'tasks',
            element: (
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            ),
          },
          {
            path: 'products',
            element: (
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            ),
          },
          {
            path: 'product/:id',
            element: (
              <ProtectedRoute>
                <AddProductPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'suppliers',
            element: (
              <ProtectedRoute>
                <Suppliers />
              </ProtectedRoute>
            ),
          },
          {
            path: 'suppliers/:id',
            element: (
              <ProtectedRoute>
                <AddSupplierPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'clients/:id',
            element: (
              <ProtectedRoute>
                <AddClientPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'clients/',
            element: (
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            ),
          },
        ]
      },
      {
        path: 'general',
        element: (
          <ProtectedRoute>
            <Chats />
          </ProtectedRoute>
        ),
      },
      {
        path: 'apps',
        element: (
          <ProtectedRoute>
            <Apps />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: 'extra-components',
        element: (
          <ProtectedRoute>
            <ExtraComponents />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        errorElement: <GeneralError />,
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: 'account',
            element: (
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorizedError },
  { path: '*', Component: NotFoundError },
]);

export default router;
