import { TypeCreatePost } from "@app/create-prompt/page";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/dataBase";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req?.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    return new Response("Failed to create a new Prompt", { status: 500 });
  }
};
