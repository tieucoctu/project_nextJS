import User from "@models/user";
import { connectToDB } from "@utils/dataBase";
import NextAuth, { Awaitable, Session, User as typeUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export interface UserSession extends Session {
  user: typeUser;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }): Promise<UserSession> {
      const user = await User.findOne({
        email: session?.user?.email,
      });
      const sessionUser = {
        ...session,
        user: { ...session?.user, id: `${user?._id}` },
      };

      return sessionUser;
    },
    async signIn({ profile }: any) {
      try {
        await connectToDB();
        //check if the user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
