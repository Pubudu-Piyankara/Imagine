import React, { Children } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex-center min-h-screen w-full bg-gray-50'>{children}</main>
  )
}

export default Layout