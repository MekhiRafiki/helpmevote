import { ConversationAgenda, Topic } from "@/types";


export const TOPICS: Topic[] = [
    {
        id: "usa-presidential-race",
        title: "USA Presidential Race 2024",
        children: [
            {
                id: "platform",
                title: "Party Platforms",
                category: "platform",
                children: [
                    { id: "presidential-overview", title: "Candidate Comparison: Find Your Match", category: "platform" },
                    { id: "harris-walz", title: "Harris | Walz Campaign", category: "platform" },
                    { id: "trump-vance", title: "Trump | Vance Campaign", category: "platform" },
                ]
            },
            {
                id: "policy",
                title: "Policy",
                category: "policy",
                children: [
                    { id: "immigration", title: "Immigration", category: "policy" },
                    { id: "abortion", title: "Abortion", category: "policy" },
                    { id: "economy", title: "Economy", category: "policy" },
                    { id: "healthcare", title: "Healthcare", category: "policy" },
                    { id: "education", title: "Education", category: "policy" },
                    { id: "climate", title: "Climate", category: "policy" },
                    { id: "gun-control", title: "Gun Control", category: "policy" },
                    { id: "voting-rights", title: "Voting Rights", category: "policy" },
                ]
            }
        ]
    },
    // You can add more high-level categories here if needed
]

export const IMMIGRATION_AGENDA: ConversationAgenda = {
    id: "immigration-agenda",
    title: "Immigration Agenda",
    plan: {
        nodes: [
            {
                id: "1",
                title: "User's Thoughts on Immigration",
                description: "Gather the user's thoughts and feelings on immigration.",
                ai_prompt: {
                    key: "user_immigration_stance",
                    guide: "Ask the user about their thoughts and feelings on immigration. What are their main concerns or hopes regarding immigration policy?"
                }
            },
            {
                id: "2",
                title: "Overview of Nominees' Stances",
                description: "Provide a brief overview of both nominees' stances on immigration.",
                ai_prompt: {
                    key: "nominees_overview",
                    guide: "Briefly introduce the immigration stances of both Kamala Harris and Donald Trump. Ask the user if they'd like to go deeper on either candidate's platform.",
                    notion_page_id: "128f7f9c7c7080649f7eee51d9eebd53"
                }
            },
            {
                id: "3",
                title: "Kamala Harris's Immigration Platform",
                description: "Detailed discussion of Kamala Harris's immigration platform and work.",
                ai_prompt: {
                    key: "harris_platform",
                    guide: "Discuss Kamala Harris's immigration platform in detail, including her past work and current proposals."
                }
            },
            {
                id: "4",
                title: "Donald Trump's Immigration Platform",
                description: "Detailed discussion of Donald Trump's immigration platform and work.",
                ai_prompt: {
                    key: "trump_platform",
                    guide: "Discuss Donald Trump's immigration platform in detail, including his past work and current proposals."
                }
            },
            {
                id: "5",
                title: "User Alignment Reflection",
                description: "Ask the user who they think they align with most.",
                ai_prompt: {
                    key: "user_alignment_reflection",
                    guide: "Based on the information provided, ask the user which nominee they think they align with most on immigration issues and why."
                }
            },
            {
                id: "6",
                title: "AI Alignment Analysis",
                description: "Provide an analysis of which nominee the user seems to align with most.",
                ai_prompt: {
                    key: "ai_alignment_analysis",
                    guide: "Based on the user's responses throughout the conversation, provide an analysis of which nominee the user seems to align with most on immigration issues. Explain the reasoning behind this assessment."
                }
            }
        ],
        edges: [
            { from: "1", to: "2" },
            { from: "2", to: "3" },
            { from: "2", to: "4" },
            { from: "3", to: "4" },
            { from: "4", to: "3" },
            { from: "3", to: "5" },
            { from: "4", to: "5" },
            { from: "5", to: "6" }
        ]
    },
}