import { Layout } from '@/components/custom/layout'
import { ReactNode } from 'react'

export interface BaseTemplateProps {
  children: ReactNode
}

export const BaseTemplate = ({ children }: BaseTemplateProps) => {
  return (
    <Layout>
      <Layout.Body>{children}</Layout.Body>
    </Layout>
  )
}
