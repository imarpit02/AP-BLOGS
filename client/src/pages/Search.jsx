import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/userFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const { data: blogData, loading } = useFetch(
    `${getEnv('VITE_BASE_URL')}/blog/search/?q=${q}`,
    { method: "GET", withCredentials: true },
    [q]
  )
  if(loading) return <Loading />
  return (
    <>
      <h4 className='font-semibold text-2xl mb-5 ml-2'>
        Search Results for : <span className='text-primary'>{q}</span>
      </h4>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-10 gap-5'>
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map(blog => (
            <BlogCard props={blog} key={blog._id} />
          ))
        ) : (
          <div className='col-span-3 flex justify-center items-center h-120'>
            <p className='text-2xl text-gray-500 font-semibold'>Data not found</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Search
