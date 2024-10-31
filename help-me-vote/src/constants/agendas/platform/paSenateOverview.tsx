import { ConversationAgenda } from "@/types";

export const PA_SENATE_OVERVIEW_AGENDA: ConversationAgenda = {
    id: "pa-senate-overview-agenda",
    title: "Pennsylvania Senate Race Overview",
    demCandidate: {
        name: "Bob Casey",
        image: "/images/casey.png",
    },
    repCandidate: {
        name: "Dave McCormick",
        image: "/images/mccormick.png",
    },
    plan: {
        nodes: [
            {
                id: "1",
                title: "Current Knowledge and Preferences",
                description: "Gather the user's current knowledge about the PA Senate race and potential voting preferences.",
                ai_prompt: {
                    key: "user_current_knowledge_senate",
                    guide: "Let's discuss the 2024 Pennsylvania Senate Election. Is there anything you'd like to know from me that might help this conversation be more productive?"
                }
            },
            {
                id: "2",
                title: "Overview of Senate Candidates",
                description: "Provide a brief overview of both Senate candidates.",
                ai_prompt: {
                    key: "senate_nominees_overview",
                    guide: "Introduce me to the main candidates for the 2024 Pennsylvania Senate race: Bob Casey (Democratic) and Dave McCormick (Republican).",
                    notion_url: "https://prism-production-04c.notion.site/Pennsylvania-Senate-Overview-130f7f9c7c708005881ecbfc559fcf3d"
                },
            },
            {
                id: "3",
                title: "Democratic Candidate Deep Dive",
                description: "Detailed discussion of Senator Casey's record and platform.",
                ai_prompt: {
                    key: "democratic_senate_campaign",
                    guide: "Let's examine Senator Bob Casey's record as incumbent, his key legislative achievements, and his vision for Pennsylvania's future.",
                    notion_url: "https://prism-production-04c.notion.site/Bob-Casey-130f7f9c7c7080a99b4ce1c53121c96f"
                }
            },
            {
                id: "4",
                title: "Republican Candidate Deep Dive",
                description: "Detailed discussion of McCormick's campaign and platform.",
                ai_prompt: {
                    key: "republican_senate_campaign",
                    guide: "Now, let's explore Dave McCormick's campaign platform, his background, and his vision for representing Pennsylvania in the Senate.",
                    notion_url: "https://prism-production-04c.notion.site/Dave-McCormick-Pennsylvania-Senate-130f7f9c7c7080239550c612f22144d2"
                }
            },
            {
                id: "5",
                title: "Alignment Analysis",
                description: "Analyze which candidate the user aligns with most closely.",
                ai_prompt: {
                    key: "senate_alignment_analysis",
                    guide: "Based on our discussion, please analyze which Senate candidate my views most closely align with on key issues facing Pennsylvania. Then explain the reasoning and show my position on the spectrum between the candidates.",
                },
                canPlotSpectrum: true
            }
        ]
    },
}