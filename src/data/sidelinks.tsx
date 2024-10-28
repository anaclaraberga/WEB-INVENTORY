import {
  IconChecklist,
  IconLayoutDashboard
} from '@tabler/icons-react'

import { Package, Truck, Users } from 'lucide-react'

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
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Produtos',
    label: '',
    href: '/products',
    icon: <Package size={18} />,
  },
  {
    title: 'Fornecedores',
    label: '',
    href: '/suppliers',
    icon: <Truck size={18} />,
  },
  {
    title: 'Clientes',
    label: '',
    href: '/clients',
    icon: <Users size={18} />,
  },
  {
    title: 'Tasks',
    label: '3',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
  },
]
