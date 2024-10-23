"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import TopicSelector from "@/components/TopicSelector"
import ChatArea from "@/components/ChatArea"
import { useAppSelector } from "@/lib/hooks"
import { selectChosenTopic } from "@/lib/features/topics/topicsSlice"


export default function PoliticalChat() {
  const selectedTopic = useAppSelector(selectChosenTopic)
  


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Help Me Vote</h1>

      <TopicSelector  />
      {selectedTopic ? (<Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="mr-2" />
            {selectedTopic ? selectedTopic.title : 'Chat'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          
           <ChatArea /> 
        </CardContent>
      </Card>)
      : (
        <p className="text-center text-gray-500">
          Please select a topic to start chatting.
        </p>
      )}
    </div>
  )
}
