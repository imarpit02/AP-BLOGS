import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogsByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/userFetch';
import { getEnv } from '@/helpers/getEnv';
import { useSelector } from 'react-redux';

const AppSidebar = () => {

  const user = useSelector(state => state.user)

  const menuItems = [
    { icon: <IoHomeOutline />, path: RouteIndex, name: 'Home' },

    {
      icon: <TbCategory />,
      path: RouteCategoryDetails,
      name: 'Categories',
      auth: true,
      role: 'admin'
    },

    {
      icon: <GrBlog />,
      path: RouteBlog,
      name: 'Blogs',
      auth: true
    },

    {
      icon: <FaRegComments />,
      path: RouteCommentDetails,
      name: 'Comments',
      auth: true
    },

    {
      icon: <LuUsers />,
      path: RouteUser,
      name: 'Users',
      auth: true,
      role: 'admin'
    },
  ].filter(item => {
    if (item.auth && !user?.isLoggedIn) return false
    if (item.role && user?.user?.role !== item.role) return false
    return true
  })

  const { data: categoryData } = useFetch(
    `${getEnv('VITE_BASE_URL')}/category/all-category`,
    { method: "GET", withCredentials: true },
  )

  return (
    <Sidebar className='pt-25'>
      <SidebarContent className='bg-white'>
        <SidebarGroup >
          <SidebarMenu>
            {menuItems.map((item, idx) => (
              <SidebarMenuItem key={idx}>
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="data-[active=true]:bg-primary data-[active=true]:text-white"
                    >
                      <div className="flex items-center gap-2 w-full">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            {categoryData?.category?.map(category => (
              <SidebarMenuItem key={category._id}>
                <NavLink to={RouteBlogsByCategory(category.slug)}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="data-[active=true]:bg-primary data-[active=true]:text-white"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <GoDot />
                        <span>{category.name}</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
