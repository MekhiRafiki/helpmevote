import { ConversationAgenda } from "@/types";

export const NY_SENATE_OVERVIEW_AGENDA: ConversationAgenda = {
    id: "ny-senate-overview-agenda",
    title: "New York Senate Race Overview",
    demCandidate: {
        name: "Kirsten Gillibrand",
        image: "/images/gillibrand.png",
    },
    repCandidate: {
        name: "Michael Sapraicone",
        image: "/images/sapraicone.png",
    },
    plan: {
        nodes: [
            {
                id: "1",
                title: "Current Knowledge and Preferences",
                description: "Gather the user's current knowledge about the NY Senate race and potential voting preferences.",
                ai_prompt: {
                    key: "user_current_knowledge_senate",
                    guide: "Let's discuss the 2024 New York Senate Election. Is there anything you'd like to know from me that might help this conversation be more productive?"
                }
            },
            {
                id: "2",
                title: "Overview of Senate Candidates",
                description: "Provide a brief overview of both Senate candidates.",
                ai_prompt: {
                    key: "senate_nominees_overview",
                    guide: "Introduce me to the main candidates for the 2024 New York Senate race: Kirsten Gillibrand (Democratic & Working Families) and Michael Sapraicone (Republican & Conservative).",
                    notion_url: "https://prism-production-04c.notion.site/New-York-Senate-Race-Overview-130f7f9c7c70800da34ec75c8d6ab5df"
                },
            },
            {
                id: "3",
                title: "Democratic Candidate Deep Dive",
                description: "Detailed discussion of Senator Gillibrand's record and platform.",
                ai_prompt: {
                    key: "democratic_senate_campaign",
                    guide: "Let's examine Senator Kirsten Gillibrand's record as incumbent, her key legislative achievements, and her vision for New York's future.",
                    notion_url: "https://prism-production-04c.notion.site/Kirsten-Gillibrand-New-York-Senate-130f7f9c7c7080d2b933c8bd89aa9731"
                }
            },
            {
                id: "4",
                title: "Republican Candidate Deep Dive",
                description: "Detailed discussion of Sapraicone's campaign and platform.",
                ai_prompt: {
                    key: "republican_senate_campaign",
                    guide: "Now, let's explore Michael Sapraicone's campaign platform, his background, and his vision for representing New York in the Senate.",
                    notion_url: "https://prism-production-04c.notion.site/Mike-Sapraicone-New-York-Senate-Race-130f7f9c7c70807ebfdbfbd4bc5c6cf1"
                }
            },
            {
                id: "5",
                title: "Alignment Analysis",
                description: "Analyze which candidate the user aligns with most closely.",
                ai_prompt: {
                    key: "senate_alignment_analysis",
                    guide: "Based on our discussion, I'll analyze which Senate candidate my views most closely align with on key issues facing New York. Then explain the reasoning and show my position on the spectrum between the candidates.",
                },
                canPlotSpectrum: true
            }
        ]
    },
}