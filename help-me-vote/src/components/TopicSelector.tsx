"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Topic } from "@/types"
import { ChevronRight } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectChosenTopic, selectTopics, setChosenTopic } from "@/lib/features/topics/topicsSlice"
import { usePostHog } from "posthog-js/react"
import { useRouter } from "next/navigation"

export default function TopicSelector() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const topics = useAppSelector(selectTopics)
    const selectedTopic = useAppSelector(selectChosenTopic)
    const posthog = usePostHog();
    const presidentialRace = topics.find(topic => topic.id === "usa-presidential-race")
    const [breadcrumbs, setBreadcrumbs] = useState<Topic[]>([])

    const handleTopicSelect = (topic: Topic) => {
        if (topic.children) {
            setBreadcrumbs([...breadcrumbs, topic])
        } else {
            dispatch(setChosenTopic(topic))
            posthog.capture('conversation_selected', {
                topic: topic.title
            })
            const knowledgeBaseId = topic.knowledge_base_id ?? "home"
            router.push(`/chat/${knowledgeBaseId}`)
        }
    }

    const navigateToBreadcrumb = (index: number) => {
        setBreadcrumbs(breadcrumbs.slice(0, index + 1))
    }

    const currentTopic = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1] : presidentialRace

    if (selectedTopic) {
        return null
    }

    return (
        <div className="">
            <div className="flex flex-row items-center gap-2">
                <div className="breadcrumbs text-base text-base-content">
                    <ul>
                        <li><a onClick={() => setBreadcrumbs([])} className="text-base-content font-semibold">All</a></li>
                        {breadcrumbs.map((crumb, index) => (
                            <li key={crumb.id}>
                                <a onClick={() => navigateToBreadcrumb(index)} className="text-base-content">{crumb.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
                {currentTopic?.children?.map((topic) => (
                    <Button
                        key={topic.id}
                        onClick={() => handleTopicSelect(topic)}
                        variant="default"
                        size="lg"
                        className="justify-start bg-base-200 text-base-content hover:bg-base-300"
                    >
                        {topic.title}
                        {topic.children && <ChevronRight className="ml-2 h-4 w-4 text-base-content" />}
                    </Button>
                ))}
            </div>
        </div>
    )
}