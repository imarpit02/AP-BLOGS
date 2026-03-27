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
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName"
import { showToast } from "@/helpers/showToast"
import { getEnv } from "@/helpers/getEnv"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/user/user.slice"
import GoogleLogin from "@/components/GoogleLogin"
import logo from '@/assets/images/logo.svg'

const SignIn = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // ✅ Zod schema
  const formSchema = z.object({
    email: z.string().email("Enter a valid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getEnv('VITE_BASE_URL')}/auth/login`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      showToast('success', response.data.message);
      dispatch(setUser(response.data.user))
      navigate(RouteIndex);
    } catch (error) {
      showToast('error', error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-linear-to-r from-purple-500 via-purple-600 to-primary px-5 lg:px-0">
      <Card className="w-full sm:max-w-md mx-auto">
        <CardHeader className='flex items-center gap-2'>
        <Button asChild variant='link'>
          <Link to={RouteIndex}>
            <img src={logo} alt="" className="w-18 h-12"/>
          </Link>
        </Button>
          <CardTitle className="text-2xl font-bold text-center">Login into Account</CardTitle>
        </CardHeader>

        <CardContent>

          <div className="mb-3">
            <GoogleLogin />
            <div className="flex items-center my-4">
              <div className="grow border-t"></div>
              <span className="mx-4 text-sm">OR</span>
              <div className="grow border-t"></div>
            </div>
          </div>

          <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>

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

            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" form="signin-form" className='w-full'>
            Sign In
          </Button>
          <div className="flex gap-3 items-center">
            <p className="text-sm text-center">Don&apos;t have account?</p>
            <Link to={RouteSignUp} className="text-primary font-medium hover:underline">Sign Up</Link>
          </div>
        </CardFooter>

      </Card>
    </div>
  )
}

export default SignIn
