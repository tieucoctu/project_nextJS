"use client";
import { TypePost } from "@app/type";
import PromptCard from "@components/PromptCard";
import { useUser } from "@hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const user = useUser();
  const router = useRouter();
  const [myPosts, setMyPosts] = useState<TypePost[]>([]);
  console.log("myPosts :", myPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${user?.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if (user?.id) fetchPosts();
  }, [user]);

  const handleEdit = (post: TypePost) => {
    router.push(`/update-prompt?postId=${post._id}`);
  };

  const handleDelete = async (post: TypePost) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter(
          (item: any) => item?._id !== post._id
        );

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">My profile</span>
      </h1>
      <p className="desc text-left">
        Welcome to your personalized profile page. Share your exceptional
        prompts and inspire others with the power of your imagination
      </p>

      <div className="mt-10 prompt_layout">
        {myPosts &&
          myPosts?.map((post: TypePost) => (
            <PromptCard
              key={post?._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
      </div>
    </section>
  );
};

export default Profile;
