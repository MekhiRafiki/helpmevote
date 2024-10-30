"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import TextareaAutosize from 'react-textarea-autosize';
import { Check, Radar, Play, Send, SkipForward } from "lucide-react"
import { useChat } from 'ai/react';
import { useEffect, useState } from "react"
import Markdown from 'react-markdown'
import { selectChosenTopic } from "@/lib/features/topics/topicsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { ConversationAgendaNode } from "@/types"
import { setUsedNotionUrls } from "@/lib/features/chat/chatSlice"
import SpectrumDisplay from "./ui/spectrumDisplay"
import QuickStartGuide from "./QuickStartGuide"
import PlanDisplay from "./PlanDisplay"
import { usePostHog } from "posthog-js/react"
import { getSpectrumPosition } from "@/actions/context"

export default function ChatArea({ chatId }: { chatId?: string }) {
    const dispatch = useAppDispatch()
    const selectedTopic = useAppSelector(selectChosenTopic)
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0)
    const [currentNode, setCurrentNode] = useState<ConversationAgendaNode | null>(null)
    const [currentGoal, setCurrentGoal] = useState("")
    const [hasSentTopicContext, setHasSentTopicContext] = useState(false)
    const posthog = usePostHog();
    const [position, setPosition] = useState<number | null>(null)
    const [canPlotSpectrum, setCanPlotSpectrum] = useState(false)



    const agenda = selectedTopic?.agenda

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 1,
        body: {
            currentGoal,
            filterKnowledgeBaseId: chatId
        },
        async onToolCall(toolCall) {
            if (toolCall.toolCall.toolName === "markGoalAsComplete") {
                handleNextNode()
                return {
                    success: true
                }
            }
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
        console.log("Submitting with context", !hasSentTopicContext, currentNode?.ai_prompt.notion_url);
        handleSubmit(e, {
            body: {
                forceContext: !hasSentTopicContext,
                notion_url: currentNode?.ai_prompt.notion_url
            }
        });
        setHasSentTopicContext(true)
        posthog.capture('message_sent', {
            topic: selectedTopic?.id,
            current_goal: currentGoal,
            current_node: currentNode?.title,
            chat_length: messages.length
        })
    }

    const handleSpectrum = async () => {
        if (messages.length > 0) {
            const position = await getSpectrumPosition(messages);
            setPosition(position);
            (document.getElementById("spectrum_modal") as HTMLDialogElement).showModal();
            posthog.capture('spectrum_conversation_determined', {
                topic: selectedTopic?.id,
                position: position,
            })
        }
    }

    // Set the current goal and node
    useEffect(() => {
        if (agenda?.plan.nodes && agenda.plan.nodes[currentNodeIndex]) {
            setCurrentGoal(agenda.plan.nodes[currentNodeIndex].ai_prompt.guide);
            setCurrentNode(agenda.plan.nodes[currentNodeIndex]);
            if (agenda.plan.nodes[currentNodeIndex].canPlotSpectrum) {
                setCanPlotSpectrum(true)
            }
        } else {
            setCurrentGoal("");
            setCurrentNode(null);
        }
        setHasSentTopicContext(false);
    }, [currentNodeIndex, agenda]);

    // Display the used notion urls in the agenda
    useEffect(() => {
        if (selectedTopic?.agenda) {
            const urls = selectedTopic.agenda.plan.nodes.map(node => node.ai_prompt.notion_url).filter(url => url !== null && url !== undefined) as string[];
            dispatch(setUsedNotionUrls(urls))
        }
    }, [selectedTopic, dispatch]);

    return (
        <div className="h-full flex flex-col flex-1 overflow-scroll">
            {currentGoal && (
                <div className="flex-shrink-0 flex items-center justify-between mb-4 mt-2 bg-base-100 rounded-full p-2 w-full h-12 overflow-hidden">
                    <div className="flex items-center gap-2 flex-grow min-w-0">
                        <PlanDisplay agenda={agenda} currentNodeIndex={currentNodeIndex} />
                        <h2 className="text-sm font-semibold text-base-content whitespace-nowrap overflow-x-auto truncate">
                            {currentNode?.title || "Current Goal"}
                        </h2>
                    </div>
                    <div className="flex-shrink-0 flex gap-2 ml-2">
                        {!hasSentTopicContext && (
                            <Button onClick={handleKickMeOff} variant="ghost" size="sm" className="rounded-full bg-base-300 text-base-content p-2">
                                <Play className="h-4 w-4" />
                            </Button>
                        )}
                        <Button onClick={handleNextNode} variant="ghost" size="sm" className="rounded-full bg-base-300 text-base-content p-2">
                            <SkipForward className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
            <ScrollArea className="flex flex-col flex-1 overflow-scroll">
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
                                    const { toolName, toolCallId, state, args } = toolInvocation;
                                    if (state === 'result'){
                                        if (toolName === "displayCandidateSpectrum") {
                                            const { result } = toolInvocation;
                                            return (
                                                <div key={toolCallId}>
                                                    <SpectrumDisplay  {...result} />
                                                </div>
                                            )
                                        } else if (toolName === "markGoalAsComplete") {
                                            return (
                                                <div key={toolCallId} className="flex items-center gap-2 text-success">
                                                    <Check className="h-4 w-4" />
                                                    <span className="text-sm font-medium">{args.topic}</span>
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
            <div className="flex-shrink-0 flex flex-col gap-2 mt-2 w-full sticky bottom-0">
                <div className="flex items-center gap-2 justify-end">
                    {position !== null ? (
                        <Button onClick={() => (document.getElementById("spectrum_modal") as HTMLDialogElement).showModal()}
                        variant="ghost" size="icon" className="rounded-md bg-base-100 text-base-content p-2"
                        >
                            <Radar className="h-4 w-4" />
                        </Button>
                    ) : (
                        <>
                        { canPlotSpectrum && (<Button onClick={handleSpectrum} variant="outline" size="sm" className="rounded-md bg-base-100 text-base-content p-2">
                            <Radar className="h-4 w-4" /> <span className="text-sm font-medium">Who do I align with?</span>
                        </Button>)}
                        </>
                    )}
                    <dialog id="spectrum_modal" className="modal">
                        <div className="modal-box">
                        {position !== null && (
                            <div className="flex flex-col items-center gap-2 text-base-content">
                                <h2 className="text-lg font-semibold">Your Position on the Spectrum</h2>
                                <SpectrumDisplay position={position} />
                                <p className="text-sm">This is your position on the spectrum between Kamala Harris and Donald Trump based on your responses in this conversation.</p>
                                <Button onClick={handleSpectrum} variant="outline" size="sm" className="rounded-md bg-base-100p-2">
                                    <span className="text-sm font-medium">Refresh</span>
                                </Button>
                            </div>
                        )}
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
                <div className="flex-shrink-0 flex gap-2 w-full flex-row items-end mb-2">
                <TextareaAutosize
                        className="flex-grow p-2 rounded-md border resize-y max-h-40 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type your message..."
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmitWithContext(e)
                            }
                        }}
                        minRows={1}
                    />
                    <Button onClick={handleSubmitWithContext} className="text-info-content rounded-full bg-info" variant="ghost" disabled={!input}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

