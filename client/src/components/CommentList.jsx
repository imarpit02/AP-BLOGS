import React from 'react'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/userFetch'
import { Avatar, AvatarImage } from './ui/avatar'
import userIcon from '@/assets/images/user.png'
import moment from 'moment'
import { useSelector } from 'react-redux'

const CommentList = ({ props }) => {

  const user = useSelector((state) => state.user)

  const { data, loading, error } = useFetch(
    `${getEnv('VITE_BASE_URL')}/comment/get/${props.blogid}`,
    { method: "GET", withCredentials: true },
  )

  const totalComments = (data?.comments?.length || 0) + (props.newComment ? 1 : 0)
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h4 className='text-2xl font-bold'>
        {
          totalComments === 0
            ? "No comments yet"
            : totalComments === 1
              ? "1 Comment"
              : `${totalComments} Comments`
        }
      </h4>

      <div className='mt-5'>

        {/* new comment */}
        {props.newComment &&
          <div className='flex items-center gap-2 mb-5'>
            <Avatar className='h-10 w-10 rounded-full'>
              <AvatarImage src={user?.user?.avatar || userIcon} />
            </Avatar>
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <p className='text-sm font-bold'>{user?.user?.name}</p>
                <p className='text-sm text-gray-500'>{moment(props.newComment?.createdAt).format('DD-MM-YYYY')}</p>
              </div>
              <p className=''>{props.newComment?.comment}</p>
            </div>
          </div>
        }

        {/* existing comment */}
        {data && data.comments.length > 0 &&
          data.comments.map(comment => (
            <div key={comment._id} className='flex items-center gap-2 mb-7'>
              <Avatar className='h-10 w-10 rounded-full'>
                <AvatarImage src={comment?.user.avatar || userIcon} />
              </Avatar>
              <div className='flex flex-col'>
                <div className='flex gap-2'>
                  <p className='text-sm font-bold'>{comment?.user.name}</p>
                  <p className='text-sm text-gray-500'>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                </div>
                <p className=''>{comment?.comment}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CommentList
