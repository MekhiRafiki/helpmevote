import { ConversationAgenda } from "@/types";

export const IMMIGRATION_AGENDA: ConversationAgenda = {
    id: "immigration-agenda",
    title: "Immigration Agenda",
    plan: {
        nodes: [
            {
                id: "1",
                title: "Thoughts on Immigration",
                description: "Gather the user's thoughts and feelings on immigration.",
                ai_prompt: {
                    key: "user_immigration_stance",
                    guide: "Lets talk about the issue of immigration in the United States Presidential Election. Probe to get my thoughts and feelings on immigration policy but I am here to learn about the candidates paltforms"
                }
            },
            {
                id: "2",
                title: "Overview of Nominees' Stances",
                description: "Provide a brief overview of both nominees' stances on immigration.",
                ai_prompt: {
                    key: "nominees_overview",
                    guide: "Briefly introduce the immigration stances of both Kamala Harris and Donald Trump's campaigns",
                    notion_url: "https://www.notion.so/Immigration-128f7f9c7c7080649f7eee51d9eebd53"
                }
            },
            {
                id: "3",
                title: "Harris | Walz Immigration Platform",
                description: "Detailed discussion of Kamala Harris's immigration platform and work.",
                ai_prompt: {
                    key: "harris_platform",
                    guide: "Lets deep dive into Kamala Harris's immigration platform in detail, including her past work and current proposals."
                }
            },
            {
                id: "4",
                title: "Trump | Vance Immigration Platform",
                description: "Detailed discussion of Donald Trump's immigration platform and work.",
                ai_prompt: {
                    key: "trump_platform",
                    guide: "Lets deep dive into Donald Trump's immigration platform in detail, including his past work and current proposals."
                }
            },
            {
                id: "5",
                title: "Alignment Analysis",
                description: "Provide an analysis of which nominee the user seems to align with most.",
                ai_prompt: {
                    key: "ai_alignment_analysis",
                    guide: "Based on my responses throughout the conversation, provide an analysis of which nominee I seem to align with most on immigration issues. Explain the reasoning behind this assessment. Display this analysis using the spectrum display tool to show me where I fall on the spectrum between the two nominees." 
                },
                canPlotSpectrum: true
            }
        ]
    },
}