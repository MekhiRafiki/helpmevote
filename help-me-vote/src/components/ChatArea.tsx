"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useChat } from 'ai/react';
import { useEffect, useState } from "react"
import Markdown from 'react-markdown'
import { selectChosenTopic } from "@/lib/features/topics/topicsSlice"
import { useAppSelector } from "@/lib/hooks"
import { CheckIcon } from "lucide-react"


export default function ChatArea() {
    const selectedTopic = useAppSelector(selectChosenTopic)
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0)
    const [currentGoal, setCurrentGoal] = useState("")
    
    const agenda = selectedTopic?.agenda

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: {
            currentGoal
        }
    });

    const handleNextNode = () => {
        if (agenda?.plan.nodes && currentNodeIndex < agenda.plan.nodes.length - 1) {
            setCurrentNodeIndex(prevIndex => prevIndex + 1);
        }
    }

    useEffect(() => {
        if (agenda?.plan.nodes && agenda.plan.nodes[currentNodeIndex]) {
            setCurrentGoal(agenda.plan.nodes[currentNodeIndex].ai_prompt.guide);
        }
    }, [currentNodeIndex, agenda]);
      
    const currentNode = agenda?.plan.nodes?.[currentNodeIndex]
    
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-md font-semibold">{currentNode?.title || "Current Goal"}</h2>
                <Button onClick={handleNextNode} variant="outline" size="sm">
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Next
                </Button>
            </div>
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
        </>
    )
}
