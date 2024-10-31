"use client"
import ChatArea from "@/components/ChatArea";
import { CircleArrowLeft } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectChosenTopic, setChosenTopic } from "@/lib/features/topics/topicsSlice"
import { selectUsedNotionUrls } from "@/lib/features/chat/chatSlice"
import ChatLibrary from "@/components/ChatLibrary"
import { usePostHog } from "posthog-js/react"
import KbQuickView from "@/components/KnowledgeBase/KbQuickView"
import { useRouter } from "next/navigation";
import { selectKnowledgeBases } from "@/lib/features/knowledgeBases/kbSlice";
import { useEffect, useState } from "react";
import { KnowledgeBase } from "@/types";


export default function ChatPage({ params }: { params: { id: string } }) {
    const knowledgeBases = useAppSelector(selectKnowledgeBases)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const selectedTopic = useAppSelector(selectChosenTopic)
    const usedNotionUrls = useAppSelector(selectUsedNotionUrls)
    const posthog = usePostHog();

    const [kb, setKb] = useState<KnowledgeBase | null>(null)

    useEffect(() => {
        const id = params.id ?? "home"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const kb = knowledgeBases.find((kb: any) => kb.id === parseInt(id))
        setKb(kb ?? {
          name: "General Chat",
          description: "Chat with the platform about anything",
          id: "home"
        })
    }, [knowledgeBases, params.id])
    
  
    const handleClearSelection = () => {
      dispatch(setChosenTopic(null))
      posthog.capture('conversation_exited')
      router.back()
    }
  
    return (
        <div className="min-h-screen flex flex-col overflow-clip h-full max-h-screen">
            <div className="px-4 pt-4 flex flex-row items-center justify-between w-full mb-2 flex-shrink-0">
              <div className="w-1/6 flex justify-start">
                <button onClick={handleClearSelection} className="rounded-full text-base-content">
                  <CircleArrowLeft />
                </button>
              </div>
              <h2
                className="w-3/4 text-center text-lg font-semibold sm:text-sm md:text-md text-base-content whitespace-nowrap truncate"
              >
                {selectedTopic?.title ?? kb?.name ?? "Home"}
              </h2>
              <div className="w-1/6 flex justify-end">
                {kb ? (
                 <KbQuickView kbId={params.id ?? "home"}/>
                ) : usedNotionUrls.length > 0 && (
                  <ChatLibrary />
                )}
              </div>
            </div>
            <div className="px-4 pb-1 flex flex-col flex-1 overflow-hidden">
                <ChatArea chatId={params.id} />
            </div>
        </div>
    )
}