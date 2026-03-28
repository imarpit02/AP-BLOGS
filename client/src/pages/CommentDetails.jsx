import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/userFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

const CommentDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading } = useFetch(
    `${getEnv("VITE_BASE_URL")}/comment/get-all-comments`,
    { method: "GET", withCredentials: true },
    [refreshData],
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_BASE_URL")}/comment/delete/${id}`,
    );

    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Comment Deleted");
    } else {
      showToast("error", "Failed to delete");
    }
  };

  if (loading) return <Loading />;

  return (
    <Card>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <Table className="min-w-200">
            {/* Table Header */}
            <TableHeader>
              <TableRow className="bg-gray-100 uppercase hover:bg-gray-100">
                <TableHead className="font-bold">Blog Title</TableHead>
                <TableHead className="font-bold">Comment By</TableHead>
                <TableHead className="font-bold">Comment</TableHead>
                <TableHead className="text-center font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data && data?.comments?.length > 0 ? (
                data.comments.map((comment) => (
                  <TableRow
                    key={comment._id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Blog Title */}
                    <TableCell className="wrap-break-words max-w-45 whitespace-normal">
                      {comment?.blogid?.title}
                    </TableCell>

                    {/* Comment author name */}
                    <TableCell>
                      <span className="bg-primary/10 rounded-full px-3 py-1 text-sm">
                        {comment?.user?.name}
                      </span>
                    </TableCell>

                    {/* Comment */}
                    <TableCell className="wrap-break-words max-w-50 whitespace-normal">
                      {comment?.comment}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="flex justify-center gap-2">
                      {/* Delete */}
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <FaRegTrashCan size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-60 text-center text-xl text-gray-500"
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
  );
};

export default CommentDetails;
