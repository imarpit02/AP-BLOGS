import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/userFetch'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { showToast } from '@/helpers/showToast';
import axios from 'axios';

const LikeCount = ({ props }) => {

  const [likeCount, setLikeCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  const user = useSelector((state) => state.user)

  const { data: blogLikeCount, loading, error } = useFetch(
    `${getEnv('VITE_BASE_URL')}/like/get-like/${props.blogid}?userid=${user?.isLoggedIn ? user.user._id : ''}`,
    { method: "GET", withCredentials: true }
  )

  useEffect(() => {
    if (blogLikeCount) {
      setLikeCount(blogLikeCount.likeCount)
      setHasLiked(blogLikeCount.isUserLiked)
    }
  }, [blogLikeCount])


  const handleLikeCount = async () => {
    try {

      if (!user?.isLoggedIn) {
        return showToast('error', 'Login to do this action')
      }

      const response = await axios.post(
        `${getEnv('VITE_BASE_URL')}/like/like`,
        {
          user: user.user._id,
          blogid: props.blogid
        },
        {
          withCredentials: true
        }
      )

      setLikeCount(response.data.likeCount)
      setHasLiked(!hasLiked)

      showToast('success', response.data.message)

    } catch (error) {
      showToast(
        'error',
        error.response?.data?.message || error.message
      )
    }
  }

  return (
    <div className='flex items-center gap-1'>
      <button className='cursor-pointer' onClick={handleLikeCount}>
        {!hasLiked ?
          <FaRegHeart />
          :
          <FaHeart color='red' />
        }
      </button>
      <span>{likeCount}</span>
    </div>
  )
}

export default LikeCount