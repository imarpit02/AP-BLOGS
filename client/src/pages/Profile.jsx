import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/userFetch";
import Loading from "@/components/Loading";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";
import userIcon from "@/assets/images/user.png";

const Profile = () => {
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);

  const user = useSelector((state) => state.user);

  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_BASE_URL")}/user/get-user/${user.user._id}`,
    { method: "GET", withCredentials: true },
    [],
  );

  const dispatch = useDispatch();

  // ✅ Zod schema
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    email: z.string().email("Enter a valid email."),
    bio: z.string().min(3, "Bio must be at least 3 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional()
      .or(z.literal("")),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(values));

    try {
      setUploading(true);
      const response = await axios.put(
        `${getEnv("VITE_BASE_URL")}/user/update-user/${user.user._id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      dispatch(setUser(response.data.user));
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

  if (loading) return <Loading />;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="">
        <div className="flex flex-col items-center gap-4">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {/* Avatar */}
                <Avatar className="group relative h-20 w-20">
                  <AvatarImage
                    src={
                      filePreview
                        ? filePreview
                        : userData?.user?.avatar || userIcon
                    }
                  />
                  <div className="border-primary absolute top-1/2 left-1/2 z-50 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 bg-black/20 group-hover:flex">
                    <IoCameraOutline size={20} className="text-primary" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>

          {/* Form */}
          <form
            id="update-profile-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FieldGroup>
              {/* name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      aria-invalid={fieldState.invalid}
                      className="h-10"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      aria-invalid={fieldState.invalid}
                      className="h-10"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* bio */}
              <Controller
                name="bio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bio">Bio</FieldLabel>
                    <Textarea
                      {...field}
                      type="text"
                      id="bio"
                      placeholder="Enter bio"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      aria-invalid={fieldState.invalid}
                      className="h-10"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="update-profile-form"
          className="h-11 w-full"
          disabled={uploading}
        >
          {uploading ? "Updating..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Profile;
