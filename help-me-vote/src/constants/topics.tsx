import { Topic } from "@/types";
import { IMMIGRATION_AGENDA } from "./agendas/policy/immigration";


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
                    { id: "immigration", title: "Immigration", category: "policy", agenda: IMMIGRATION_AGENDA },
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