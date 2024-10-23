"use server"

import { getAIPrompt } from "@/lib/utils"
import { AIPrompt } from "@/types";

export async function getContextSupport(aiPrompt: AIPrompt) {
    const contextSupport = await getAIPrompt(aiPrompt);
    console.log({ contextSupport });
    return contextSupport;
}