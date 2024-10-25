"use client"
import { CircleArrowLeft } from "lucide-react"
import TopicSelector from "@/components/TopicSelector"
import ChatArea from "@/components/ChatArea"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectChosenTopic, setChosenTopic } from "@/lib/features/topics/topicsSlice"
import { Button } from "@/components/ui/button"
import { selectUsedNotionUrls } from "@/lib/features/chat/chatSlice"
import ChatLibrary from "@/components/ChatLibrary"
import { usePostHog } from "posthog-js/react"


export default function PoliticalChat() {
  const dispatch = useAppDispatch()
  const selectedTopic = useAppSelector(selectChosenTopic)
  const usedNotionUrls = useAppSelector(selectUsedNotionUrls)
  const posthog = usePostHog();

  const handleClearSelection = () => {
    dispatch(setChosenTopic(null))
    posthog.capture('conversation_exited')
  }

  return (
    <div className="container mx-auto px-4 pt-4 pb-1 h-screen w-screen flex flex-col overflow-hidden bg-base-300">
      <TopicSelector />
      {selectedTopic ? (
        <div className="flex-grow flex flex-col overflow-hidden w-full h-full rounded-md">
            <div className="flex flex-row items-center justify-between w-full mb-2">
              <div className="w-1/6 flex justify-start">
                <button onClick={handleClearSelection} className="rounded-full text-base-content">
                  <CircleArrowLeft />
                </button>
              </div>
              <h2 className="w-3/4 text-center text-lg font-semibold sm:text-sm md:text-md text-base-content whitespace-nowrap truncate">{selectedTopic.title}</h2>
              <div className="w-1/6 flex justify-end">
                {usedNotionUrls.length > 0 && (
                  <ChatLibrary />
                )}
              </div>
            </div>
          <div className="flex-grow overflow-auto px-4">
            <ChatArea />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Please select a topic to start chatting.
        </p>
      )}
    </div>
  )
}
