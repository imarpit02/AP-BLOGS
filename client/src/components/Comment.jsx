import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { RouteSignIn } from "@/helpers/RouteName";
import { Textarea } from "./ui/textarea";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";

const Comment = ({ props }) => {
  const [newComment, setNewComment] = useState();

  const [isSaving, setIsSeving] = useState(false);

  const user = useSelector((state) => state.user);

  // ✅ Zod schema
  const formSchema = z.object({
    comment: z.string().min(1, "Enter comment to submit"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values) => {
    const newValues = { ...values, blogid: props.blogid, user: user.user._id };
    try {
      setIsSeving(true);
      const response = await axios.post(
        `${getEnv("VITE_BASE_URL")}/comment/add`,
        newValues,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      setNewComment(response.data.comment);
      form.reset();
      showToast("success", response.data.message);
    } catch (error) {
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setIsSeving(false);
    }
  };

  return (
    <div className="">
      <h4 className="mb-5 flex items-center gap-2 text-2xl font-bold">
        <FaComment className="text-primary/90" />
        Comments
      </h4>

      {user && user.isLoggedIn ? (
        <form id="comments-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Comment */}
            <Controller
              name="comment"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="comment">Comment</FieldLabel>
                  <Textarea
                    {...field}
                    type="text"
                    id="comment"
                    placeholder="Type your comment here..."
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" form="comments-form" className="mt-2">
            {isSaving ? "Comment adding..." : "Add comment"}
          </Button>
        </form>
      ) : (
        <div>
          <span>Want to add comment?</span>
          <Button asChild variant="link">
            <Link to={RouteSignIn}>Sign In</Link>
          </Button>
        </div>
      )}

      <div className="mt-5 border-t pt-5">
        <CommentList props={{ blogid: props.blogid, newComment }} />
      </div>
    </div>
  );
};

export default Comment;
