import { ConversationAgenda } from "@/types";

export const KAMALA_HARRIS_DEEP_DIVE: ConversationAgenda = {
    id: "kamala-harris-deep-dive",
    title: "Kamala Harris Campaign Deep Dive",
    demCandidate: {
        name: "Kamala Harris",
        image: "/images/harris.png",
    },
    repCandidate: {
        name: "Donald Trump",
        image: "/images/trump.png",
    },
    plan: {
        nodes: [
            {
                id: "1",
                title: "Introduction",
                description: "Set the stage for the deep dive into Kamala Harris's platform.",
                ai_prompt: {
                    key: "introduction",
                    guide: "Let's take a close look at Kamala Harris's platform for the upcoming Presidential Election. We'll cover a variety of key policy areas. Before we begin, lets get to know any thoughts or stances about her campaign that may help this conversation be productive?",
                    notion_url: "https://prism-production-04c.notion.site/Kamala-Harris-s-New-Way-Forward-128f7f9c7c70809197def39ee93132b1"                    
                }
            },
            {
                id: "2",
                title: "Lowering Costs",
                description: "Discuss Harris's proposals to lower costs for middle-class families.",
                ai_prompt: {
                    key: "lowering_costs",
                    guide: "Harris's platform emphasizes 'Lowering Costs for Middle-Class Families.' This section covers cutting taxes, reducing food and grocery costs, lowering healthcare and prescription drug prices, and managing energy costs. It also includes proposals to protect consumers from hidden fees and fraud. What are your thoughts on these initiatives? Are there any specific points that resonate with you or that I should elaborate on?"
                }
            },
            {
                id: "3",
                title: "Opportunity Economy",
                description: "Explore Harris's vision for an 'Opportunity Economy.'",
                ai_prompt: {
                    key: "opportunity_economy",
                    guide: "The 'Opportunity Economy' is a central theme in Harris's platform. This involves helping Americans buy homes and afford rent, investing in small businesses, promoting American innovation, and strengthening opportunities for workers. It also includes building a care economy and strengthening opportunity in all communities. Are there any aspects that you find particularly appealing or concerning?"
                }
            },
            {
                id: "4",
                title: "Taxes and Retirement",
                description: "Explain Harris's plans for making the tax code fairer and protecting retirement benefits.",
                ai_prompt: {
                    key: "taxes_retirement",
                    guide: "Harris's platform also addresses the tax code and retirement security. It proposes to make the tax code fairer by ensuring the wealthy pay their fair share and promoting growth through targeted investments. It also focuses on protecting Americans' ability to retire with dignity by safeguarding Social Security and Medicare. Lets dicuss if these views on taxes and retirement align with my own?"
                }
            },
            {
                id: "5",
                title: "Recent Debate Performance",
                description: "Lets take a look at Kamala Harris's recent debate performance and how it compares to other campaigns.",
                ai_prompt: {
                    key: "debate_performance",
                    guide: "Lets take a look at Kamala Harris's recent debate performance, what did she emphasize in her policy? and how did she compare to other candidates?",
                    notion_url: "https://prism-production-04c.notion.site/Kamala-Debate-Recap-129f7f9c7c708088bcdcf99253c3d6e1?pvs=4"
                }
            },
            {
                id: "6",
                title: "Synthesis and Reflection",
                description: "Encourage the user to reflect on Harris's platform and how it aligns with their values.",
                ai_prompt: {
                    key: "synthesis_reflection",
                    guide: "We've now explored the major elements of Kamala Harris's platform. Lets get into my overall impression and see if her vision resonates with my values and priorities? Based on my responses, provide me with an analysis of her vision and how it aligns with my values and priorities."
                },
                canPlotSpectrum: true
            }
        ]
    },
}
