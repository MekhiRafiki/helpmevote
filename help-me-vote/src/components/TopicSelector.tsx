"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Topic } from "@/types"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectChosenTopic, selectTopics, setChosenTopic } from "@/lib/features/topics/topicsSlice"
import { usePostHog } from "posthog-js/react"

export default function TopicSelector() {
    const dispatch = useAppDispatch()
    const topics = useAppSelector(selectTopics)
    const selectedTopic = useAppSelector(selectChosenTopic)
    const posthog = usePostHog();

    const [openCategory, setOpenCategory] = useState<string | null>("platform")

    const handleTopicSelect = (topic: Topic) => {
        dispatch(setChosenTopic(topic))
        posthog.capture('topic_selected', {
            topic: topic.title
        })
    }

    const toggleCategory = (categoryId: string) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId)
    }

    const presidentialRace = topics.find(topic => topic.id === "usa-presidential-race")

    if (selectedTopic) {
      return null
    }

    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>
                    Discuss the 2024 USA Presidential Race with AI
                </CardTitle>
            </CardHeader>
            <CardContent> 
              {presidentialRace?.children?.map((category) => (
                  <div key={category.id} className="mb-4">
                      <Button
                          onClick={() => toggleCategory(category.id)}
                          variant="outline"
                          size="sm"
                          className="w-full justify-between"
                      >
                          {category.title}
                          {openCategory === category.id ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                      </Button>
                      {openCategory === category.id && (
                          <div className="mt-2 grid grid-cols-1 gap-2">
                              {category.children?.map((topic) => (
                                  <Button
                                      key={topic.id}
                                      onClick={() => handleTopicSelect(topic)}
                                      variant="ghost"
                                      size="sm"
                                      className="justify-start hover:bg-gray-100"
                                  >
                                      {topic.title}
                                  </Button>
                              ))}
                          </div>
                      )}
                  </div>
              ))}
            </CardContent>
        </Card>
    )
}