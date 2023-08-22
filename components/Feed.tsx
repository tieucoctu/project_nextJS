"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { TypePost } from "@app/type";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: TypePost[];
  handleTagClick: (tagName: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post: TypePost) => (
        <PromptCard post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [post, setPost] = useState<TypePost[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<
    number | undefined | NodeJS.Timeout
  >();
  const [searchResults, setSearchResults] = useState<TypePost[]>([]);
  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");

    return post.filter(
      (item) =>
        regex.test(item?.creator?.username) ||
        regex.test(item?.tag) ||
        regex.test(item?.prompt)
    );
  };

  const handleSearchChange = (value: any) => {
    clearTimeout(searchTimeout);
    setSearchText(value.target.value);
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(value.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    };
    fetchPosts();
  }, []);
  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchResults && searchResults}
          handleTagClick={(tagName: string) => handleTagClick(tagName)}
        />
      ) : (
        <PromptCardList
          data={post && post}
          handleTagClick={(tagName: string) => handleTagClick(tagName)}
        />
      )}
    </section>
  );
};

export default Feed;
