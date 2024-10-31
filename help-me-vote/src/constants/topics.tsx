import { BallotItem, Topic } from "@/types";
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


// Sample static data
export const BALLOT_STRUCTURE: BallotItem[] = [
    {
        id: 'home',
        name: 'General',
        description: 'Chat with the Help Me Vote assistant about anything',
    },
    {
        id: 'usa-presidential-race',
        name: 'Presidential Race',
        description: 'View information about the USA Presidential Race 2024',
        children: [
            {
                id: '1',
                name: 'Kamala Harris | Tim Walz',
                description: 'Democratic',
            },
            {
                id: '3',
                name: 'Donald Trump | JD Vance',
                description: 'Republican',
            },
        ],
        topics: [
            { id: "presidential-overview", title: "Presidential Candidate Comparison: Find Your Match", agenda: PRESIDENTIAL_OVERVIEW_AGENDA },
            { id: "harris-walz", title: "Harris | Walz Campaign Deep Dive", agenda: KAMALA_HARRIS_DEEP_DIVE },
            { id: "trump-vance", title: "Trump | Vance Campaign Deep Dive", agenda: GOP_2024_DEEP_DIVE },
        ]
    },
    {
        id: 'states',
        name: 'State Senate Races',
        description: 'View information about state elections',
        children: [
            {
                id: 'ny-senator',
                name: 'New York Senator',
                description: 'Senate Election Candidates',
                children: [
                    {
                        id: '5',
                        name: 'Kirsten E. Gillibrand',
                        description: 'Democratic & Working Families',
                    },
                    {
                        id: '6',
                        name: 'Michael D. Sapraicone',
                        description: 'Republican & Conservative',
                    },
                    {
                        id: '7',
                        name: 'Diane Sare',
                        description: 'LaRouche',
                    },
                ],
            },
            {
                id: 'pa-senator',
                name: 'Pennsylvania Senator',
                description: 'Senate Election Candidates',
                children: [
                    {
                        id: '8',
                        name: 'Bob Casey',
                        description: 'Democratic',
                    },
                    {
                        id: '9',
                        name: 'Dave McCormick',
                        description: 'Republican',
                    },
                    {
                        id: '10',
                        name: 'Leila Hazou',
                        description: 'Green Party',
                    },
                    {
                        id: '11',
                        name: 'Marty Selker',
                        description: 'Constitution Party',
                    },
                    {
                        id: '12',
                        name: 'John C. Thomas',
                        description: 'Libertarian',
                    },
                ],
            },
            // {
            //     id: 'ny',
            //     name: 'New York',
            //     description: 'New York State Elections',
            //     children: [
            //         {
            //             id: 'ny-races',
            //             name: 'Races',
            //             description: 'Election Races',
            //             children: [
                            
            //             ]
            //         },
            //         {
            //             id: 'ny-proposals',
            //             name: 'Proposals',
            //             description: 'State Proposals and Referendums',
            //         }
            //     ]
            // },
            // {
            //     id: 'pa',
            //     name: 'Pennsylvania',
            //     description: 'Pennsylvania State Elections',
            //     children: [
            //         {
            //             id: 'pa-races',
            //             name: 'Races',
            //             description: 'Election Races',
            //             children: [
                            
            //             ]
            //         },
            //         {
            //             id: 'pa-proposals',
            //             name: 'Proposals',
            //             description: 'State Proposals and Referendums',
            //         }
            //     ]
            // }
        ]
    }
];