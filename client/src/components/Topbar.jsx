import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '@/assets/images/logo.svg'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { LuLogIn } from "react-icons/lu";
import SearchBox from './SearchBox';
import { RouteAddBlog, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import userIcon from '@/assets/images/user.png'
import { FaRegCircleUser } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv'
import { IoIosSearch } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { useSidebar } from './ui/sidebar'
import { useLocation } from "react-router-dom"

const Topbar = () => {

  const [showSearch, setShowSearch] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { toggleSidebar } = useSidebar()

  const location = useLocation()

  useEffect(() => {
    setShowSearch(false)
  }, [location])

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${getEnv('VITE_BASE_URL')}/auth/logout`,
        {
          withCredentials: true
        }
      )
      showToast('success', response.data.message);
      dispatch(removeUser())
      navigate(RouteIndex);
    } catch (error) {
      showToast('error', error.response?.data?.message || error.message)
    }
  }

  const user = useSelector((state) => state.user)

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className='flex justify-between items-center h-16 w-full fixed z-20 bg-white px-5 border-b'>
      <button onClick={toggleSidebar} type='button' className='mr-3 block sm:hidden'>
        <MdOutlineMenu size={25} className='text-gray-700' />
      </button>
      <Link to={RouteIndex}>
        <img src={logo} alt="" className='w-70 sm:w-25 lg:w-30' />
      </Link>
      <div className='w-125'>
        <div className={`sm:relative absolute sm:block left-0 top-15 sm:top-0 w-full bg-white sm:px-0 px-5 ${showSearch ? 'block' : 'hidden'}`}>
          <SearchBox />
        </div>
      </div>
      <button onClick={toggleSearch} type='button' className='mr-5 block sm:hidden'>
        <IoIosSearch size={25} className='text-gray-700' />
      </button>
      <div>
        {!user.isLoggedIn ?
          <Button asChild>
            <Link to={RouteSignIn}>
              <LuLogIn />
              <span>Sign In</span>
            </Link>
          </Button>
          : <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=' h-8 w-8 rounded-full'>
                <Avatar>
                  <AvatarImage src={user.user.avatar || userIcon} />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className='flex gap-2'>
                    <p className='text-sm text-nowrap'>{user.user.name}</p>
                    <p className='text-sm text-primary'>{user.user.role === 'admin' && user.user.role}</p>
                  </div>
                  <p className='font-bold'>{user.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild >
                  <Link to={RouteProfile}>
                    <FaRegCircleUser />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild >
                  <Link to={RouteAddBlog}>
                    <MdAdd />
                    Create Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild  >
                  <Link onClick={handleLogout}>
                    <MdOutlineLogout color='red' />
                    <span className='text-red-600'>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }

      </div>
    </div>
  )
}

export default Topbar
