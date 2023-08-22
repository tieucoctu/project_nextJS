"use Client";

import { TypePost } from "@app/type";
import { useUser } from "@hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  post: TypePost;
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}) => {
  const [copied, setCopied] = useState<any>("");
  const user = useUser();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post?.prompt);
    navigator.clipboard.writeText(post?.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Link href="/profile">
            <Image
              src={`${post?.creator?.image}`}
              alt="user_name"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </Link>

          <div className="flex flex-col">
            <Link href="/profile">
              <h3 className="font-sans font-semibold text-gray-500">
                {post?.creator?.username}
              </h3>
              <p className="font-serif text-sm text-gray-500">
                {post?.creator?.email}
              </p>
            </Link>
          </div>
        </div>
        <div className="copy_btn" onClick={() => {}}>
          <Image
            src={
              copied === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            height={12}
            width={12}
          />
        </div>
      </div>
      <p className="my-4 font-sans text-sm text-gray-700">{post?.prompt}</p>
      <p
        className="font-thin text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag}
      </p>
      {user?.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
