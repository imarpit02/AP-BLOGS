import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import axios from "axios"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { RouteIndex, RouteSignIn } from "@/helpers/RouteName"
import { getEnv } from "@/helpers/getEnv"
import { showToast } from "@/helpers/showToast"
import GoogleLogin from "@/components/GoogleLogin"

const SignUp = () => {

  const navigate = useNavigate()

  // ✅ Zod schema
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    email: z.string().email("Enter a valid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password should be same",
    path: ["confirmPassword"], // error will show on confirmPassword field
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getEnv('VITE_BASE_URL')}/auth/register`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      showToast('success', response.data.message);
      navigate(RouteIndex);
    } catch (error) {
      showToast('error', error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-linear-to-r from-purple-500 via-purple-600 to-primary px-5 lg:px-0">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Your Account</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-3">
            <GoogleLogin />
            <div class="flex items-center my-4">
              <div class="grow border-t"></div>
              <span class="mx-4 text-sm">OR</span>
              <div class="grow border-t"></div>
            </div>
          </div>
          <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

              {/* Name */}
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
                      placeholder="Enter your email"
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
                      placeholder="Enter your password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/*Confirm Password */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="confirmPassword"
                      placeholder="Confirm password"
                      aria-invalid={fieldState.invalid}
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

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" form="signin-form" className='w-full'>
            Sign Up
          </Button>
          <div className="flex gap-3 items-center">
            <p className="text-sm text-center">Already have account?</p>
            <Link to={RouteSignIn} className="text-primary font-medium hover:underline">Sign In</Link>
          </div>
        </CardFooter>

      </Card>
    </div>
  )
}

export default SignUp
