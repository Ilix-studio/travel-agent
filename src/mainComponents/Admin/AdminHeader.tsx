import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, LogOut } from "lucide-react";

export function AdminHeader() {
  return (
    <header className='bg-blue-100 border-b border-slate-200 px-6 py-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>WanderLux Admin</h1>
          <p className='text-sm text-slate-600'>
            Travel Agency Management System
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='sm'>
            <Bell className='w-4 h-4' />
          </Button>
          <Button variant='ghost' size='sm'>
            <Settings className='w-4 h-4' />
          </Button>

          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage src='/admin-avatar.png' />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className='text-sm'>
              <p className='font-medium'>Admin User</p>
              <p className='text-slate-600'>admin@wanderlux.com</p>
            </div>
          </div>

          <Button variant='ghost' size='sm'>
            <LogOut className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </header>
  );
}
