import Prompt from "@/models/prompt"
import connectToDB from "@/utils/database"

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator')
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response(`Failed to fetch ${params.id} prompts`, {status: 500})
    }
}

export const PATCH = async (req, {params}) => {
    try {
        await connectToDB();
        const {prompt, tag} = await req.json();
        const newPrompt = await Prompt.findById(params.id)
        newPrompt.prompt = prompt
        newPrompt.tag = tag
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status: 200})
    } catch (error) {
        return new Response(`Failed to fetch ${params.id} prompts`, {status: 500})
    }
}
export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findByIdAndDelete(params.id)
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response(`Failed to delete ${params.id} prompts`, {status: 500})
    }
}