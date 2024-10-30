import ViteLogo from '@/assets/vite.svg'
import { Button } from '@/components/custom/button'
import Loader from '@/components/loader'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  const navigation = useNavigate()

  return (
    <Suspense fallback={<Loader />}>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <img
            src={ViteLogo}
            className='relative m-auto'
            width={301}
            height={60}
            alt='Vite'
          />
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below <br />
                to log into your account
              </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground mt-4'>
              Don't have an account yet?{' '}
            </p>
            <Button variant="outline" onClick={() => navigation('/sign-up')}>
              Create account
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}