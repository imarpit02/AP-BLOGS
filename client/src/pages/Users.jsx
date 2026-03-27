import { Button } from '@/components/ui/button'
import { Card, CardContent, } from '@/components/ui/card'
import React, { useState } from 'react'
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
import { FaRegTrashCan } from "react-icons/fa6"
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import userIcon from '@/assets/images/user.png'
import moment from 'moment'

const Users = () => {

  const [refreshData, setRefreshData] = useState(false)

  const { data, loading } = useFetch(
    `${getEnv('VITE_BASE_URL')}/user/get-all-users`,
    { method: "GET", withCredentials: true },
    [refreshData]
  )

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv('VITE_BASE_URL')}/user/delete/${id}`
    )

    if (response) {
      setRefreshData(!refreshData)
      showToast('success', "User Deleted")
    } else {
      showToast('error', 'Failed to delete')
    }
  }

  if (loading) return <Loading />

  return (
    <Card>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <Table className="min-w-200">
            {/* Table Header */}
            <TableHeader>
              <TableRow className='bg-gray-100 hover:bg-gray-100 uppercase'>
                <TableHead className='font-bold'>Role</TableHead>
                <TableHead className='font-bold'>Name</TableHead>
                <TableHead className='font-bold '>Email</TableHead>
                <TableHead className='font-bold'>Avatar</TableHead>
                <TableHead className='font-bold '>Registered On</TableHead>
                <TableHead className='font-bold text-center'>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data && data?.user?.length > 0 ? (
                data.user.map((user) => (
                  <TableRow
                    key={user._id}
                    className='hover:bg-gray-50 transition'
                  >
                    {/* Blog Title */}
                    <TableCell>
                      {user?.role}
                    </TableCell>

                    {/* Blog Title */}
                    <TableCell>
                      {user?.name}
                    </TableCell>

                    {/* Blog Title */}
                    <TableCell>
                      {user?.email}
                    </TableCell>

                    {/* Blog Title */}
                    <TableCell>
                      <img
                        src={user?.avatar || userIcon}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </TableCell>

                    {/* Blog Title */}
                    <TableCell>
                      {moment(user?.createdAt).format('DD MMM YYYY, hh:mm A')}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className='flex justify-center gap-2'>
                      {/* Delete */}
                      <Button
                        size="icon"
                        variant='outline'
                        onClick={() => handleDelete(user._id)}
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
                    className='text-center h-60 text-gray-500 text-xl'
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
  )
}

export default Users