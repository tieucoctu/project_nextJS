import Prompt from "@models/prompt";
import { connectToDB } from "@utils/dataBase";

export const GET = async (req: Request, { params }: { params: any }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params?.id,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
