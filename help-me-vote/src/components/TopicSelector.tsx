"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Topic } from "@/types"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TopicSelectorProps {
    topics: Topic[]
    selectedTopic: Topic | null
    setSelectedTopic: (topic: Topic | null) => void
}

export default function TopicSelector({ topics, selectedTopic, setSelectedTopic }: TopicSelectorProps) {
    const [openCategory, setOpenCategory] = useState<string | null>("platform")

    const handleTopicSelect = (topic: Topic) => {
        setSelectedTopic(topic)
    }

    const handleClearSelection = () => {
        setSelectedTopic(null)
    }

    const toggleCategory = (categoryId: string) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId)
    }

    const presidentialRace = topics.find(topic => topic.id === "usa-presidential-race")

    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>
                    {selectedTopic ? `Currently Discussing: ${selectedTopic.title}` : "Discuss the 2024 USA Presidential Race"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {selectedTopic ? (
                    <Button onClick={handleClearSelection} variant="outline" size="sm">
                        Clear Selection
                    </Button>
                ) : (
                    presidentialRace?.children?.map((category) => (
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
                    ))
                )}
            </CardContent>
        </Card>
    )
}