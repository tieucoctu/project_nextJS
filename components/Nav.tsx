"use client";

import { useUser } from "@hooks/useUser";
import { signOut, signIn, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Nav = () => {
  const user = useUser();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      console.log("res :", res);
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt={"logo"}
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign out
            </button>
            <Link href={`/profile?id=${user?.id}`}>
              <Image
                src={user?.image ?? "/assets/images/logo.svg"}
                width={37}
                height={37}
                alt="img-profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn()}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile */}
      <div className="sm:hidden flex relative">
        {user ? (
          <div className="flex">
            <Image
              src={user?.image ?? "/assets/images/logo.svg"}
              width={37}
              height={37}
              alt="img-profile"
              className="rounded-full"
              onClick={() => setToggleDropdown((pre) => !pre)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn()}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
