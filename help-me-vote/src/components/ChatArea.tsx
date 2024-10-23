"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {  Topic } from "@/types"
import { Send } from "lucide-react"
import { useChat } from 'ai/react';
import { useEffect, useState } from "react"
import { IMMIGRATION_JOURNEY } from "@/constants/topics"
import Markdown from 'react-markdown'

interface ChatAreaProps {
    selectedTopic: Topic
}

export default function ChatArea({ selectedTopic }: ChatAreaProps) {
    const journey = IMMIGRATION_JOURNEY;
    const [currentNodeId, setCurrentNodeId] = useState('1');
    const [currentGoal, setCurrentGoal] = useState("");

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: {
            currentGoal
        }
    });

    const handleNextNode = () => {
        const currentNodeIndex = journey.plan.nodes.findIndex(node => node.id === currentNodeId);
        if (currentNodeIndex < journey.plan.nodes.length - 1) {
            setCurrentNodeId(journey.plan.nodes[currentNodeIndex + 1].id);
        }
    }

    useEffect(() => {
        const currentNode = journey.plan.nodes.find(node => node.id === currentNodeId);
        if (currentNode) {
            setCurrentGoal(currentNode.ai_prompt.guide);
        }
    }, [currentNodeId, journey]);
      
    return (
        <>
             <ScrollArea className="h-[400px] mb-4 p-4 border rounded-md">
                {messages.map((message, index) => (
                <div
                    key={index}
                    className={`mb-4 ${
                    message.role === "user" ? "text-right" : "text-left"
                    }`}
                >
                    <span
                    className={`inline-block p-2 rounded-lg ${
                        message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    >
                        <Markdown>{message.content}</Markdown>
                    </span>
                </div>
                ))}
            </ScrollArea>
            <div className="flex gap-2">
                <Input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit()
                    }
                    }}
                />
                <Button onClick={handleSubmit}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
            <div>
                <Button onClick={handleNextNode}>
                    Next Node
                </Button>
                <span>{currentGoal}</span>
            </div>
        </>
    )
}