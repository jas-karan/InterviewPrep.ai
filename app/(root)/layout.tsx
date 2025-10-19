import React, { ReactNode } from 'react'
import { toast, Toaster } from 'sonner'

const RootLayout = ({children}:{children: ReactNode}) => {
  return (
    <div className="auth-layout">
      {children}
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default RootLayout