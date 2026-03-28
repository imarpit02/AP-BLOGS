import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

const CategoryDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data: categoryData, loading } = useFetch(
    `${getEnv("VITE_BASE_URL")}/category/all-category`,
    { method: "GET", withCredentials: true },
    [refreshData],
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_BASE_URL")}/category/delete/${id}`,
    );

    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Deleted successfully");
    } else {
      showToast("error", "Failed to delete");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex lg:justify-end">
        <Button asChild>
          <Link to={RouteAddCategory}>+ Add Category</Link>
        </Button>
      </div>

      <Card className="">
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-200">
              {/* Table Header */}
              <TableHeader>
                <TableRow className="bg-gray-100 uppercase hover:bg-gray-100">
                  <TableHead className="font-bold">Category Name</TableHead>
                  <TableHead className="pl-30 font-bold">Slug</TableHead>
                  <TableHead className="text-center font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody>
                {categoryData?.category?.length > 0 ? (
                  categoryData.category.map((category) => (
                    <TableRow
                      key={category._id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Category Name */}
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>

                      {/* Slug */}
                      <TableCell className="pl-25">
                        <span className="bg-primary/10 rounded-full px-3 py-1 text-sm">
                          {category.slug}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="flex justify-center gap-2">
                        {/* Edit */}
                        <Button
                          asChild
                          size="icon"
                          variant="outline"
                          className="text-primary hover:bg-primary hover:text-white"
                        >
                          <Link to={RouteEditCategory(category._id)}>
                            <FaRegEdit size={16} />
                          </Link>
                        </Button>

                        {/* Delete */}
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDelete(category._id)}
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
                      colSpan={3}
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
    </div>
  );
};

export default CategoryDetails;
