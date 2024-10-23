"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Message, Sender, Topic } from "@/types"
import { useState } from "react"
import { Send } from "lucide-react"

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

interface ChatAreaProps {
    selectedTopic: Topic
}

export default function ChatArea({ selectedTopic }: ChatAreaProps) {
    const [inputMessage, setInputMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([])

    const handleSendMessage = () => {
        if (inputMessage.trim() === "") return

        const updatedMessages = [
            ...messages,
            { content: inputMessage, sender: Sender.USER },
        ]

        setMessages(updatedMessages as Message[])
        setInputMessage("")

        // Simulate AI response
        setTimeout(() => {
            if (selectedTopic) {
            const aiResponse = generateAIResponse(selectedTopic, inputMessage)
            setMessages([...updatedMessages, { content: aiResponse, sender: Sender.AI }])
            }
        }, 1000)
    }

      
    return (
        <>
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
        </>
    )
}