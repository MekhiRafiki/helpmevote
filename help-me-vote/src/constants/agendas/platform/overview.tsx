import { ConversationAgenda } from "@/types";

export const PRESIDENTIAL_OVERVIEW_AGENDA: ConversationAgenda = {
    id: "presidential-overview-agenda",
    title: "Presidential Overview Agenda",
    plan: {
        nodes: [
            {
                id: "1",
                title: "Current Knowledge and Preferences",
                description: "Gather the user's current knowledge about the parties and potential voting preferences.",
                ai_prompt: {
                    key: "user_current_knowledge",
                    guide: "Let's talk about the major nominees from the Republican and Democratic parties for the upcoming presidential election. Lets start off with getting to know any stances or thoughts about me that may help this conversation be productive?"
                }
            },
            {
                id: "2",
                title: "Overview of Major Nominees",
                description: "Provide a brief overview of the major nominees from both parties.",
                ai_prompt: {
                    key: "nominees_overview",
                    guide: "Give me a brief introduction to the major nominees from the Republican and Democratic parties for the 2024 USA Presidential Election."
                }
            },
            {
                id: "3",
                title: "Democratic Campaign Deep Dive",
                description: "Detailed discussion of the Democratic nominee's campaign and key tenets.",
                ai_prompt: {
                    key: "democratic_campaign",
                    guide: "Let's dive deep into the Democratic nominee's campaign: Kamala Harris | Tim Walz. Focusing on their major policy positions, key campaign promises, and overall vision for the country."
                }
            },
            {
                id: "4",
                title: "Republican Campaign Deep Dive",
                description: "Detailed discussion of the Republican nominee's campaign and key tenets.",
                ai_prompt: {
                    key: "republican_campaign",
                    guide: "Now, let's explore the Republican nominee's campaign: Donald Trump | JD Vance. In detail, covering their main policy stances, key campaign promises, and overall vision for the nation."
                }
            },
            {
                id: "5",
                title: "Alignment Analysis",
                description: "Provide an analysis of which nominee the user seems to align with most.",
                ai_prompt: {
                    key: "ai_alignment_analysis",
                    guide: "Based on our conversation in my responses, provide me with an analysis of which nominee I seem to align with most on the major campaign issues. Then explain the reasoning behind this assessment."
                }
            }
        ]
    },
}