import { ConversationAgenda } from "@/types";

export const GOP_2024_DEEP_DIVE: ConversationAgenda = {
    id: "gop-2024-deep-dive",
    title: "2024 GOP Platform Deep Dive",
    plan: {
        nodes: [
            {
                id: "1",
                title: "Introduction",
                description: "Introduce the 2024 GOP Platform and its core themes.",
                ai_prompt: {
                    key: "introduction",
                    guide: "Let's explore the 2024 Republican Party Platform.  It focuses heavily on 'Making America Great Again' and addresses key issues like the economy, immigration, and national security. Lets get to know any thoughts or stances about the GOP platform that may help this conversation be productive?"
                },
            },
            {
                id: "2",
                title: "Economy and Inflation",
                description: "Discuss the GOP's economic proposals, including tackling inflation, tax cuts, and energy independence.",
                ai_prompt: {
                    key: "economy_inflation",
                    guide: "The platform prioritizes defeating inflation, cutting taxes (especially for workers), and achieving energy dominance. It also emphasizes bringing back manufacturing jobs and securing fair trade deals. Are there any aspects that you find particularly appealing or concerning?"
                },
            },
            {
                id: "3",
                title: "Immigration and Border Security",
                description: "Examine the GOP's stance on immigration, including border wall construction and increased deportations.",
                ai_prompt: {
                    key: "immigration_border",
                    guide: "A major focus is sealing the border and implementing a large-scale deportation operation.  The platform also calls for ending 'sanctuary cities' and stricter vetting of immigrants.  Are there any aspects that you find particularly appealing or concerning?"
                },
            },
            {
                id: "4",
                title: "National Security and Foreign Policy",
                description: "Analyze the GOP's national security proposals, including military modernization and strengthening alliances.",
                ai_prompt: {
                    key: "national_security",
                    guide: "The platform advocates for strengthening the military, building an 'Iron Dome' missile defense system, and restoring peace through strength.  It also touches on strengthening alliances and countering China. Are there any aspects that you find particularly appealing or concerning?"
                },
            },
             {
                id: "5",
                title: "Social and Cultural Issues",
                description: "Discuss the GOP's positions on social and cultural issues such as education, parental rights, and religious liberty.",
                ai_prompt: {
                    key: "social_cultural",
                    guide: "The platform addresses various social and cultural topics, including parental rights in education, opposing critical race theory, protecting religious liberty, and keeping men out of women's sports.  It also touches on supporting traditional families and combating antisemitism. Are there any aspects that you find particularly appealing or concerning?"
                },
            },
            {
                id: "6",
                title: "Synthesis and Reflection",
                description: "Encourage reflection on the platform's overall message and its alignment with user values.",
                ai_prompt: {
                    key: "synthesis_reflection",
                    guide: "We've now covered the core elements of the 2024 GOP Platform.  What is my overall impression? Does its vision resonate with my values and priorities?  Let's analyze how this platform aligns with my political perspectives and what aspects I find most compelling or concerning."
                },
            },
        ],
    },
};