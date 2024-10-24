"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  <div className="container mx-auto p-4 max-w-4xl h-screen w-screen flex flex-col overflow-hidden">
    <h1 className="text-2xl font-bold mb-4">🗳️ Help Me Vote</h1>

    <TopicSelector />
    {selectedTopic ? (
      <Card className="flex-grow flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center mr-2">
              {selectedTopic.title}
            </div>
            <div className="flex flex-row items-center gap-2">
              {usedNotionUrls.length > 0 && (
                <ChatLibrary />
              ) }
              <Button onClick={handleClearSelection} variant="outline" size="sm">
                <DoorOpen />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          <ChatArea />
        </CardContent>
      </Card>
    ) : (
      <p className="text-center text-gray-500">
        Please select a topic to start chatting.
      </p>
    )}
  </div>
)
}
