import React from 'react'
import { Card, CardContent } from './ui/card'
import { useSelector } from 'react-redux'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { IoCalendarOutline } from "react-icons/io5";
import userIcon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'
import { motion } from "framer-motion"

const BlogCard = ({ props }) => {

  const user = useSelector((state) => state.user)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.4 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
        <Card className="pt-5 hover:shadow-lg cursor-pointer h-full">
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-between gap-2'>
                <Avatar>
                  <AvatarImage src={props.author.avatar || userIcon} />
                </Avatar>
                <span>{props.author.name}</span>
              </div>
              {props.author.role === 'admin' &&
                <Badge>Admin</Badge>
              }
            </div>
            <div className='my-2'>
              <img src={props.featuredImage} alt="" className='rounded w-full h-40 sm:h-25 md:h-50 lg:h-60 object-cover' />
            </div>
            <div>
              <p className='flex items-center gap-2 mb-2'>
                <IoCalendarOutline />
                <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
              </p>
              <h2 className='text-xl font-semibold line-clamp-2'>{props.title}</h2>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export default BlogCard

