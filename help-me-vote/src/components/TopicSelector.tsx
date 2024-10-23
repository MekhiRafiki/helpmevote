"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Topic } from "@/types"
import { X, ChevronLeft } from "lucide-react"

interface TopicSelectorProps {
    topics: Topic[]
    selectedTopic: Topic | null
    setSelectedTopic: (topic: Topic | null) => void
}

export default function TopicSelector({ topics, selectedTopic, setSelectedTopic }: TopicSelectorProps) {
    const [selectedCategory, setSelectedCategory] = useState<Topic | null>(null)

    const handleCategorySelect = (category: Topic) => {
        setSelectedCategory(category)
    }

    const handleTopicSelect = (topic: Topic) => {
        setSelectedTopic(topic)
    }

    const handleClearSelection = () => {
        setSelectedTopic(null)
        setSelectedCategory(null)
    }

    const handleBackToCategories = () => {
        setSelectedCategory(null)
    }

    return (
        <Card className="mb-4">
            <CardHeader>
                {!selectedTopic ? (
                    <CardTitle>
                        {selectedCategory ? `Choose a topic in ${selectedCategory.title}` : "Choose a category"}
                    </CardTitle>
                ) : (
                    <div className="flex items-center justify-between">
                        <CardTitle>Currently Discussing: {selectedTopic.title}</CardTitle>
                        <Button onClick={handleClearSelection} variant="ghost" size="sm">
                            <X />
                        </Button>
                    </div>
                )}
            </CardHeader>
            {!selectedTopic && (
                <CardContent>
                    {selectedCategory ? (
                        <>
                            <Button onClick={handleBackToCategories} variant="outline" size="sm" className="mb-4">
                                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Categories
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedCategory.children?.map((topic) => (
                                    <Button
                                        key={topic.id}
                                        onClick={() => handleTopicSelect(topic)}
                                        className="text-left h-auto py-2"
                                    >
                                        {topic.title}
                                    </Button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {topics.map((category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => handleCategorySelect(category)}
                                    className="text-left h-auto py-2"
                                >
                                    {category.title}
                                </Button>
                            ))}
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    )
}