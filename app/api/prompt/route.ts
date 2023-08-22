import Prompt from "@models/prompt";
import { connectToDB } from "@utils/dataBase";

export const GET = async (req: any) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
