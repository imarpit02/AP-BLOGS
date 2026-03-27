import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main className='w-full'>
        <div className='w-full min-h-[calc(100vh-45px)] px-5 lg:px-10 pt-26 sm:pt-28 pb-10 lg:pb-16'>
          <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  )
}

export default Layout
