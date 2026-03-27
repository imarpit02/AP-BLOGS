import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import axios from "axios"
import * as z from "zod"
import slugify  from 'slugify'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { Link, useNavigate } from 'react-router-dom'
import { RouteCategoryDetails } from '@/helpers/RouteName'

const AddCategory = () => {

  const navigate = useNavigate()

  // ✅ Zod schema
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    slug: z.string().min(3, "Slug must be at least 3 characters."),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  const categoryName = form.watch('name')
  useEffect(() => {
    if(categoryName) {
      const slug = slugify(categoryName, { lower: true })
      form.setValue('slug', slug)
    }
  },[categoryName])

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getEnv('VITE_BASE_URL')}/category/add`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      showToast('success', response.data.message);
      form.reset()
      navigate(RouteCategoryDetails)
    } catch (error) {
      showToast('error', error.response?.data?.message || error.message)
    }
  }

  return (
    <div>
      <div className='mb-3'>
        <Button asChild variant='outline'>
          <Link to={RouteCategoryDetails}>  
           &lt;&nbsp;&nbsp;Go Back
          </Link>
        </Button>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardContent>
          <form id="add-category-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                      placeholder="Enter category name"
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
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" form="add-category-form" className='w-full'>
            Save
          </Button>         
        </CardFooter>
      </Card>
    </div>
  )
}

export default AddCategory
