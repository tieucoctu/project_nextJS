"use client";

import { TypeCreatePost } from "@app/type";
import Form from "@components/Form";
import { useUser } from "@hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePrompt = () => {
  const user = useUser();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<TypeCreatePost>({ prompt: "", tag: "" });

  const createPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          userId: user?.id,
          tag: post?.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (e) {
      console.log("e :", e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      setSubmitting={setSubmitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
