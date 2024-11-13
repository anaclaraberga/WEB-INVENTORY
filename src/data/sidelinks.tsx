
import { CircleUser, ClipboardList, LayoutDashboard, Package, Truck, Users } from 'lucide-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/admin',
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: 'Produtos',
    label: '',
    href: '/admin/products',
    icon: <Package size={18} />,
  },
  {
    title: 'Fornecedores',
    label: '',
    href: '/admin/suppliers',
    icon: <Truck size={18} />,
  },
  {
    title: 'Clientes',
    label: '',
    href: '/admin/clients',
    icon: <Users size={18} />,
  },
  {
    title: 'Usuários',
    label: '',
    href: '/admin/users',
    icon: <CircleUser size={18} />,
  },
  {
    title: 'Pedidos',
    label: '',
    href: '/admin/orders',
    icon: <ClipboardList size={18} />,
  }
]
