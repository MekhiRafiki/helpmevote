"use client"
import { DoorOpen } from "lucide-react"
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
    <div className="container mx-auto px-4 pt-4 pb-1 max-w-4xl h-screen w-screen flex flex-col overflow-hidden bg-base-300">
      <h1 className="text-2xl font-bold mb-2 text-base-content">🗳️ Help Me Vote</h1>

      <TopicSelector />
      {selectedTopic ? (
        <div className="flex-grow flex flex-col overflow-hidden bg-base-200 rounded-md">
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-md font-semibold sm:text-sm md:text-md text-base-content">{selectedTopic.title}</h2>
            <div className="flex flex-row items-center gap-2">
              {usedNotionUrls.length > 0 && (
                <ChatLibrary />
              )}
              <Button onClick={handleClearSelection} variant="outline" size="sm" className="bg-base-100 text-base-content border-base-300">
                <DoorOpen />
              </Button>
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
