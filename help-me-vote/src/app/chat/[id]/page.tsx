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
import { KNOWLEDGE_BASES } from "@/constants/topics";


export default function ChatPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const selectedTopic = useAppSelector(selectChosenTopic)
    const usedNotionUrls = useAppSelector(selectUsedNotionUrls)
    const posthog = usePostHog();

    const knowledgeBase = params.id ?? "home"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kb = KNOWLEDGE_BASES.find((kb: any) => kb.id === knowledgeBase)
  
    const handleClearSelection = () => {
      dispatch(setChosenTopic(null))
      posthog.capture('conversation_exited')
      router.back()
    }
  
    return (
        <div className="min-w-screen min-h-screen px-4 pt-4 pb-1 flex flex-col overflow-hidden bg-base-300">
             <div className="flex flex-row items-center justify-between w-full mb-2">
              <div className="w-1/6 flex justify-start">
                <button onClick={handleClearSelection} className="rounded-full text-base-content">
                  <CircleArrowLeft />
                </button>
              </div>
              <h2
                className="w-3/4 text-center text-lg font-semibold sm:text-sm md:text-md text-base-content whitespace-nowrap truncate"
              >
                {selectedTopic?.title ?? kb?.title ?? "Home"}
              </h2>
              <div className="w-1/6 flex justify-end">
                {kb ? (
                 <KbQuickView kbId={kb.id}/>
                ) : usedNotionUrls.length > 0 && (
                  <ChatLibrary />
                )}
              </div>
            </div>
            <ChatArea chatId={params.id} />
        </div>
    )
}