import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { ReactNode } from 'react'

export interface BaseTemplateProps {
  children: ReactNode
}

export const BaseTemplate = ({ children }: BaseTemplateProps) => {
  return (
    <Layout>
      <Layout.Header sticky>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>{children}</Layout.Body>
    </Layout>
  )
}
