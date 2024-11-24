import { Button } from '@/components/custom/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { StringUtils } from '@/utils/StringUtils'
import { useState } from 'react'
import { CustomAlertDialog } from './custom/alert-dialog'

export function UserNav() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <DropdownMenu>
      <CustomAlertDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
        title='Tem certeza que deseja sair?'
        description='Ao finalizar sua sessão, toda alteração não salva será perdida permanentemente'
      />
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>{StringUtils.getNameInitials(user?.name ?? 'Guilherme')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500 !hover:text-red-500' onClick={() => setOpen(true)}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
