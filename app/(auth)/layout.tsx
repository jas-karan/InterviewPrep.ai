import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
import { toast, Toaster } from 'sonner'

const AuthLayout = async ({children}:{children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
    if(isUserAuthenticated){
      redirect('/');
    }

  return (
    <div className="auth-layout">
      {children}
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default AuthLayout