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
import { ConversationAgendaNode } from "@/types"


export default function ChatArea() {
    const selectedTopic = useAppSelector(selectChosenTopic)
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0)
    const [currentNode, setCurrentNode] = useState<ConversationAgendaNode | null>(null)
    const [currentGoal, setCurrentGoal] = useState("")
    const [hasMessageForCurrentGoal, setHasMessageForCurrentGoal] = useState(false)

    
    const agenda = selectedTopic?.agenda

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 4,
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

    const handleKickMeOff = () => {
        handleInputChange({ target: { value: currentGoal } } as React.ChangeEvent<HTMLInputElement>);
        // handleSubmit();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmitWithContext = (e: any) => {
        console.log("Current Node", currentNode);
        console.log(hasMessageForCurrentGoal, currentNode?.ai_prompt.notion_url);
        handleSubmit(e, {
            body: {
                forceContext: !hasMessageForCurrentGoal,
                notion_url: currentNode?.ai_prompt.notion_url
            }
        });
    }

    useEffect(() => {
        if (agenda?.plan.nodes && agenda.plan.nodes[currentNodeIndex]) {
            setCurrentNode(agenda.plan.nodes[currentNodeIndex]);
        } else {
            setCurrentNode(null);
        }
    }, [currentNodeIndex, agenda]);


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

    return (
        <div className="flex flex-col h-full">
           {currentGoal && (
            <div className="flex-shrink-0">
                <div className="flex flex-col">
                    <p className="text-left text-gray-500 text-sm">
                            Current Focus
                    </p>
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
                </div>
            </div>
            )}
            <ScrollArea className="flex-grow overflow-auto mb-4 p-4 border rounded-md">
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
                        {message.toolInvocations?.map((toolInvocation, index) => (
                            <div key={index}>
                                <p>{JSON.stringify(toolInvocation)}</p>
                            </div>
                        ))}
                    </span>
                </div>
                ))}
            </ScrollArea>
            <div className="flex-shrink-0 flex gap-2 w-full">
                <Input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmitWithContext(e)
                    }
                    }}
                />
                <Button onClick={handleSubmitWithContext}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
