import { Button } from '@/components/ui/button'
import { Card, CardContent, } from '@/components/ui/card'
import { RouteAddBlog, RouteEditBlog, } from '@/helpers/RouteName'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/userFetch'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { FaRegEdit } from "react-icons/fa"
import { FaRegTrashCan } from "react-icons/fa6"
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'

const BlogDetails = () => {

  const [refreshData, setRefreshData] = useState(false)

  const { data: blogData, loading } = useFetch(
    `${getEnv('VITE_BASE_URL')}/blog/get-all`,
    { method: "GET", withCredentials: true },
    [refreshData]
  )

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv('VITE_BASE_URL')}/blog/delete/${id}`
    )

    if (response) {
      setRefreshData(!refreshData)
      showToast('success', 'Deleted successfully')
    } else {
      showToast('error', 'Failed to delete')
    }
  }

  if (loading) return <Loading />

  return (
    <div className='flex flex-col gap-4'>

      {/* Header */}
      <div className='flex lg:justify-end'>
        <Button asChild>
          <Link to={RouteAddBlog}>
            + Add Blog
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-200">
              {/* Table Header */}
              <TableHeader>
                <TableRow className='bg-gray-100 hover:bg-gray-100 uppercase'>
                  <TableHead className='font-bold'>Author</TableHead>
                  <TableHead className='font-bold'>Category Name</TableHead>
                  <TableHead className='font-bold '>Title</TableHead>
                  <TableHead className='font-bold'>Slug</TableHead>
                  <TableHead className='font-bold '>Posted On</TableHead>
                  <TableHead className='font-bold text-center'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              {/* Table Body */}
              <TableBody>
                {blogData?.blog?.length > 0 ? (
                  blogData.blog.map((blog) => (
                    <TableRow
                      key={blog._id}
                      className='hover:bg-gray-50 transition'
                    >
                      {/* Author */}
                      <TableCell className=''>
                        {blog?.author?.name}
                      </TableCell>
                      {/* Category Name */}
                      <TableCell className=''>
                        {blog?.category?.name}
                      </TableCell>
                      {/* Title */}
                      <TableCell className='max-w-62.5 wrap-break-words whitespace-normal'>
                        {blog?.title}
                      </TableCell>
                      {/* Slug */}
                      <TableCell className='max-w-50 wrap-break-words whitespace-normal'>
                        <span>
                          {blog?.slug}
                        </span>
                      </TableCell>
                      {/* Posted On */}
                      <TableCell className=''>
                        {moment(blog?.createdAt).format('DD-MM-YYYY')}
                      </TableCell>
                      {/* Actions */}
                      <TableCell className='flex justify-center gap-2'>
                        {/* Edit */}
                        <Button
                          asChild
                          size="icon"
                          variant='outline'
                          className='text-primary hover:bg-primary hover:text-white'
                        >
                          <Link to={RouteEditBlog(blog._id)}>
                            <FaRegEdit size={16} />
                          </Link>
                        </Button>
                        {/* Delete */}
                        <Button
                          size="icon"
                          variant='outline'
                          onClick={() => handleDelete(blog._id)}
                          className='text-red-500 hover:bg-red-500 hover:text-white'
                        >
                          <FaRegTrashCan size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))

                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='h-60 text-center mx-auto text-gray-500 text-xl'
                    >
                      Data not found
                    </TableCell>
                  </TableRow>

                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogDetails