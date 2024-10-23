"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TOPICS } from "@/constants/topics"
import { Topic } from "@/types"

interface TopicSelectorProps {
    selectedTopic: Topic | null
    setSelectedTopic: (topic: Topic | null) => void
}

export default function TopicSelector({ selectedTopic, setSelectedTopic }: TopicSelectorProps) {
    const handleTopicSelect = (topic: Topic) => {
      setSelectedTopic(topic)
    }
  
    const handleClearTopic = () => {
      setSelectedTopic(null)
    }
  
    return (
      <Card className="mb-4">
        <CardHeader>
          {!selectedTopic && <CardTitle>Select a Topic</CardTitle>}
        </CardHeader>
        <CardContent>
          {selectedTopic ? (
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Currently Discussing: {selectedTopic.title}</h2>
              <Button onClick={handleClearTopic} variant="ghost" size="sm">
                X
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TOPICS.map((topic) => (
                <Button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className="text-left h-auto py-2"
                >
                  {topic.title}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }