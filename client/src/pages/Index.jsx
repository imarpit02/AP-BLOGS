import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/userFetch'
import React from 'react'
import { motion } from "framer-motion"

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const Index = () => {

  const { data: blogData, loading } = useFetch(
    `${getEnv('VITE_BASE_URL')}/blog/blogs`,
    { method: "GET", withCredentials: true },
  )

  if (loading) return <Loading />
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 gap-5'
    >
      {blogData && blogData.blog.length > 0 ? (
        blogData.blog.map(blog => (
          <BlogCard props={blog} key={blog._id} />
        ))
      ) : (
        <div className='col-span-3 flex justify-center items-center h-120'>
          <p className='text-2xl text-gray-500 font-semibold'>Data not found</p>
        </div>
      )}
    </motion.div>
  )
}

export default Index
