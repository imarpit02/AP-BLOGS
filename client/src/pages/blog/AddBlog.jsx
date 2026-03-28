import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import slugify from "slugify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/userFetch";
import Dropzone from "react-dropzone";
import { Label } from "@/components/ui/label";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";

const AddBlog = () => {
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { data: categoryData, loading } = useFetch(
    `${getEnv("VITE_BASE_URL")}/category/all-category`,
    { method: "GET", withCredentials: true },
  );

  // ✅ Zod schema
  const formSchema = z.object({
    category: z.string().min(3, "Category is required"),
    title: z.string().min(3, "Title must be at least 3 characters."),
    slug: z.string().min(3, "Slug must be at least 3 characters."),
    blogContent: z
      .string()
      .min(3, "Blog content must be at least 3 characters."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  const onSubmit = async (values) => {
    const newValues = { ...values, author: user.user._id };
    if (!file) {
      showToast("error", "Feature image required");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(newValues));

    try {
      setUploading(true);
      const response = await axios.post(
        `${getEnv("VITE_BASE_URL")}/blog/add`,
        formData,
        {
          withCredentials: true,
        },
      );
      form.reset();
      setFile();
      setFilePreview();
      navigate(RouteBlog);
      showToast("success", response.data.message);
    } catch (error) {
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  };

  return (
    <div>
      <div className="mb-3">
        <Button asChild variant="outline">
          <Link to={RouteBlog}>&lt;&nbsp;&nbsp;Go Back</Link>
        </Button>
      </div>
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="add-blog-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* category */}
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="" id="category">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="max-w-60">
                        <SelectGroup>
                          {categoryData &&
                            categoryData.category.length > 0 &&
                            categoryData.category.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="title"
                      placeholder="Enter blog title"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Slug */}
              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="slug">Slug</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="slug"
                      placeholder="Slug"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* File Preview */}
              <div className="mt-1">
                <Label>File Preview</Label>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="inline-block">
                      <input {...getInputProps()} />
                      <div className="relative mt-2 flex h-16 w-32 cursor-pointer items-center justify-center border-2 border-dashed hover:bg-gray-50">
                        {filePreview ? (
                          <img
                            src={filePreview}
                            alt=""
                            className="h-full w-full object-cover p-1"
                          />
                        ) : (
                          <span className="text-4xl leading-none text-gray-400">
                            +
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              {/* Editor */}
              <Controller
                name="blogContent"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="blogContent">Blog Content</FieldLabel>
                    <Editor
                      props={{ initialData: "", onChange: handleEditorData }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="add-blog-form"
            disabled={uploading}
            className="h-11 w-28 text-[16px]"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddBlog;
