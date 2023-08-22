import { TypeCreatePost } from "@app/type";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/dataBase";

//GET(read)
export const GET = async (request: Request, { params }: { params: any }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all", { status: 500 });
  }
};

//PUT
export const PUT = async (request: Request, { params }: { params: any }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Fails is fetch all", { status: 500 });
  }
};

//DELETE
export const DELETE = async (request: Request, { params }: { params: any }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Fails is fetch all", { status: 500 });
  }
};
