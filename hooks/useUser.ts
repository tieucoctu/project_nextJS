import { User } from "next-auth";
import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session } = useSession();

  const user = session?.user as User | undefined;
  return user;
};
