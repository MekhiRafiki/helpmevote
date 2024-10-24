"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Play, Send, SkipForward } from "lucide-react"
import { useChat } from 'ai/react';
import { useEffect, useState } from "react"
import Markdown from 'react-markdown'
import { selectChosenTopic } from "@/lib/features/topics/topicsSlice"
import { useAppSelector } from "@/lib/hooks"


export default function ChatArea() {
    const selectedTopic = useAppSelector(selectChosenTopic)
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0)
    const [currentGoal, setCurrentGoal] = useState("")
    const [hasMessageForCurrentGoal, setHasMessageForCurrentGoal] = useState(false)

    
    const agenda = selectedTopic?.agenda

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: {
            currentGoal
        }
    });

    const handleNextNode = () => {
        if (agenda?.plan.nodes && currentNodeIndex < agenda.plan.nodes.length - 1) {
            setCurrentNodeIndex(prevIndex => prevIndex + 1);
        } else {
            setCurrentNodeIndex(-1);
        }
    }

    useEffect(() => {
        if (agenda?.plan.nodes && agenda.plan.nodes[currentNodeIndex]) {
            setCurrentGoal(agenda.plan.nodes[currentNodeIndex].ai_prompt.guide);
            setHasMessageForCurrentGoal(false);
        } else {
            setCurrentGoal("");
        }
    }, [currentNodeIndex, agenda]);

    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
            setHasMessageForCurrentGoal(true);
        }
    }, [messages]);

    const handleKickMeOff = () => {
        handleInputChange({ target: { value: currentGoal } } as React.ChangeEvent<HTMLInputElement>);
        // handleSubmit();
    };
      
    const currentNode = agenda?.plan.nodes?.[currentNodeIndex]
    
    return (
        <>
           {currentGoal && (
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-md font-semibold">{currentNode?.title || "Current Goal"}</h2>
                    <div className="flex gap-2">
                        {!hasMessageForCurrentGoal && (<Button onClick={handleKickMeOff} variant="outline" size="sm">
                            <Play className="h-4 w-4 mr-1" />
                        </Button>)}
                        <Button onClick={handleNextNode} variant="outline" size="sm">
                            <SkipForward className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
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
                        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                    }
                    }}
                />
                <Button onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </>
    )
}
