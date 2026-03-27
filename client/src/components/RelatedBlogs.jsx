import { getEnv } from '@/helpers/getEnv'
import { RouteBlogDetails } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/userFetch'
import React from 'react'
import { Link } from 'react-router-dom'

const RelatedBlogs = ({ props }) => {

  const { data, loading, error } = useFetch(
    `${getEnv('VITE_BASE_URL')}/blog/get-related-blogs/${props.category}/${props.currentBlog}`,
    { method: "GET", withCredentials: true },
  )

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2 className='text-2xl font-bold mb-5'>Related Blogs</h2>
      <div>
        {data && data.relatedBlogs.length > 0 ?
          data.relatedBlogs.map(blog => (
            <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
              <div className='flex items-center gap-2 mb-3 pb-3 border-b transition-all duration-300 hover:shadow-xs hover:-translate-y-0.5 cursor-pointer rounded-sm p-2'>
                <img src={blog.featuredImage} alt="" className='w-25 h-18 object-cover rounded-md ' />
                <h4 className='line-clamp-2 font-semibold'>{blog.title}</h4>
              </div>
            </Link>
          ))
          :
          <div>
            <h4 className='text-lg text-gray-500'>No Related Blogs Found</h4>
          </div>
        }
      </div>
    </div>
  )
}

export default RelatedBlogs
