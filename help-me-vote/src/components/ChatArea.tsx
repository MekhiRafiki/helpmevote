"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import TextareaAutosize from 'react-textarea-autosize';
import { Play, Send, SkipForward } from "lucide-react"
import { useChat } from 'ai/react';
import { useEffect, useState } from "react"
import Markdown from 'react-markdown'
import { selectChosenTopic } from "@/lib/features/topics/topicsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { ConversationAgendaNode } from "@/types"
import { addUsedNotionUrl, setUsedNotionUrls } from "@/lib/features/chat/chatSlice"
import SpectrumDisplay from "./ui/spectrumDisplay"
import QuickStartGuide from "./QuickStartGuide"
import PlanDisplay from "./PlanDisplay"
import { usePostHog } from "posthog-js/react"


export default function ChatArea() {
    const dispatch = useAppDispatch()
    const selectedTopic = useAppSelector(selectChosenTopic)
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0)
    const [currentNode, setCurrentNode] = useState<ConversationAgendaNode | null>(null)
    const [currentGoal, setCurrentGoal] = useState("")
    const [hasMessageForCurrentGoal, setHasMessageForCurrentGoal] = useState(false)
    const posthog = usePostHog();



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
            posthog.capture('conversation_next_node', {
                topic: selectedTopic?.id,
            })
        } else {
            setCurrentNodeIndex(-1);
            posthog.capture('conversation_completed', {
                topic: selectedTopic?.id,
            })
        }
    }

    const handleKickMeOff = () => {
        handleInputChange({ target: { value: currentGoal } } as React.ChangeEvent<HTMLInputElement>);
        posthog.capture('conversation_kicked_off', {
            topic: selectedTopic?.id,
            current_goal: currentGoal,
            current_node: currentNode?.title,
        })
        // handleSubmit();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmitWithContext = (e: any) => {
        if (!hasMessageForCurrentGoal && currentNode?.ai_prompt.notion_url) {
            dispatch(addUsedNotionUrl(currentNode.ai_prompt.notion_url!))
        }
        handleSubmit(e, {
            body: {
                forceContext: !hasMessageForCurrentGoal,
                notion_url: currentNode?.ai_prompt.notion_url
            }
        });
        posthog.capture('message_sent', {
            topic: selectedTopic?.id,
            current_goal: currentGoal,
            current_node: currentNode?.title,
            chat_length: messages.length
        })
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
        if (messages.length === 0) {
            dispatch(setUsedNotionUrls([]))
        }
    }, [messages, dispatch]);

    return (
        <div className="flex flex-col h-full">
            {currentGoal && (
                <div className="flex-shrink-0 flex items-center justify-between mb-4 mt-2 bg-primary rounded-full p-2 w-full h-12 overflow-hidden">
                    <div className="flex items-center gap-1 flex-grow min-w-0">
                        <PlanDisplay agenda={agenda} currentNodeIndex={currentNodeIndex} />
                        <h2 className="text-sm font-semibold text-primary-content whitespace-nowrap overflow-x-auto truncate">
                            {currentNode?.title || "Current Goal"}
                        </h2>
                    </div>
                    <div className="flex-shrink-0 flex gap-2 ml-2">
                        {!hasMessageForCurrentGoal && (
                            <Button onClick={handleKickMeOff} variant="ghost" size="sm" className="rounded-full bg-base-300 p-1">
                                <Play className="h-4 w-4" />
                            </Button>
                        )}
                        <Button onClick={handleNextNode} variant="ghost" size="sm" className="rounded-full bg-primary text-primary-content p-1">
                            <SkipForward className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
            <ScrollArea className="flex-grow overflow-auto mb-2 rounded-md">
            {messages.length === 0 ? (
                <QuickStartGuide />
            ) : (
                messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}
                    >
                        <div
                            className={`chat-bubble ${
                                message.role === "user"
                                    ? "bg-info text-info-content"
                                    : "bg-base-100 text-base-content"
                            }`}
                        >
                            <Markdown>{message.content}</Markdown>
                            {message.toolInvocations?.map(toolInvocation => {
                                const { toolName, toolCallId, state } = toolInvocation;
                                if (state === 'result'){
                                    if (toolName === "displayCandidateSpectrum") {
                                        const { result } = toolInvocation;
                                        return (
                                            <div key={toolCallId}>
                                                <SpectrumDisplay  {...result} />
                                            </div>
                                        )
                                    }
                                }
                                return (
                                    <div key={index}>
                                        <p>{JSON.stringify(toolInvocation)}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))
            )}
            </ScrollArea>
            <div className="flex-shrink-0 flex gap-2 w-full flex-row items-end mb-2">
             <TextareaAutosize
                    className="flex-grow p-2 rounded-md border border-base-300 resize-y max-h-40 bg-base-100 text-base-content focus:bg-base-100 focus:text-base-content"
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmitWithContext(e)
                        }
                    }}
                    minRows={1} // Start with a single row
                />
                <Button onClick={handleSubmitWithContext} className="bg-base-100 text-base-content border-base-300" variant="outline">
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

