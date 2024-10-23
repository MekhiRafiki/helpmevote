"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"

type Topic = {
  id: string
  title: string
}

type Message = {
  content: string
  sender: "user" | "ai"
}

const topics: Topic[] = [
  { id: "kamala2024", title: "Kamala Harris 2024 Presidential" },
  { id: "abortion", title: "Compare Candidates on Abortion" },
  { id: "gunsafety", title: "Compare Candidates on Gun Safety" },
]

// Simple AI response generator
const generateAIResponse = (topic: Topic, userMessage: string): string => {
  const responses = [
    `Regarding ${topic.title}, it's important to consider multiple perspectives.`,
    `Many voters are concerned about ${topic.title}. What specific aspects interest you?`,
    `${topic.title} is a complex issue. Let's break it down further.`,
    `How do you feel ${topic.title} affects your community specifically?`,
    `Candidates have varying stances on ${topic.title}. Would you like to know more about a specific candidate's position?`,
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export default function PoliticalChat() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic)
    setMessages([
      {
        content: `Let's discuss ${topic.title}. What would you like to know?`,
        sender: "ai",
      },
    ])
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    const updatedMessages = [
      ...messages,
      { content: inputMessage, sender: "user" },
    ]

    setMessages(updatedMessages)
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      if (selectedTopic) {
        const aiResponse = generateAIResponse(selectedTopic, inputMessage)
        setMessages([...updatedMessages, { content: aiResponse, sender: "ai" }])
      }
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Political Chat Assistant</h1>

      {!selectedTopic ? (
        <Card>
          <CardHeader>
            <CardTitle>Select a Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <Button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className="text-left h-auto py-4"
                >
                  {topic.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2" />
              {selectedTopic.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] mb-4 p-4 border rounded-md">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </span>
                </div>
              ))}
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
