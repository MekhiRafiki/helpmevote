import { Topic } from "@/types";
import { IMMIGRATION_AGENDA } from "./agendas/policy/immigration";
import { PRESIDENTIAL_OVERVIEW_AGENDA } from "./agendas/platform/overview";
import { KAMALA_HARRIS_DEEP_DIVE } from "./agendas/platform/harrisWalz";
import { GOP_2024_DEEP_DIVE } from "./agendas/platform/trumpVance";


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
                    { id: "presidential-overview", title: "Candidate Comparison: Find Your Match", category: "platform", agenda: PRESIDENTIAL_OVERVIEW_AGENDA },
                    { id: "harris-walz", title: "Harris | Walz Campaign", category: "platform", agenda: KAMALA_HARRIS_DEEP_DIVE },
                    { id: "trump-vance", title: "Trump | Vance Campaign", category: "platform", agenda: GOP_2024_DEEP_DIVE },
                ]
            },
            {
                id: "policy",
                title: "Policy",
                category: "policy",
                children: [
                    { id: "immigration", title: "Immigration", category: "policy", agenda: IMMIGRATION_AGENDA },
                    // { id: "abortion", title: "Abortion", category: "policy" },
                    // { id: "economy", title: "Economy", category: "policy" },
                    // { id: "healthcare", title: "Healthcare", category: "policy" },
                    // { id: "education", title: "Education", category: "policy" },
                    // { id: "climate", title: "Climate", category: "policy" },
                    // { id: "gun-control", title: "Gun Control", category: "policy" },
                    // { id: "voting-rights", title: "Voting Rights", category: "policy" },
                ]
            }
        ]
    },
    // You can add more high-level categories here if needed
]

export const KNOWLEDGE_BASES = [
    {
        title: "Kamala Harris Presidential Candidate", 
        id: "1", 
        description: "A deep dive into Kamala Harris's platform and policies as a presidential candidate.",
        contextItems: [
            { url: "https://www.kamalaharris.com" },
            { url: "https://www.joebiden.com" },
        ]
    },
    {
        title: "Donald Trump Presidential Candidate", 
        id: "2", 
        description: "A deep dive into Donald Trump's platform and policies as a presidential candidate.",
        contextItems: [
            { url: "https://www.donaldjtrump.com" },
            { url: "https://www.kristijennifer.com" },
        ]
    },
    {
        title: "Immigration in the USA", 
        id: "3", 
        description: "A deep dive into immigration policies in the USA.",
        contextItems: [
            { url: "https://www.uscis.gov" },
            { url: "https://www.dhs.gov" },
        ]
    },
    {
        title: "Climate Change Policies", 
        id: "4", 
        description: "A deep dive into climate change policies.", 
        contextItems: [
            { url: "https://www.epa.gov" },
            { url: "https://www.whitehouse.gov" },
        ]
    },
    {
        title: "Economic Impact of COVID-19", 
        id: "5", 
        description: "A deep dive into the economic impact of COVID-19.", 
        contextItems: [
            { url: "https://www.cnbc.com" },
            { url: "https://www.nytimes.com" },
        ]
    }
  ];