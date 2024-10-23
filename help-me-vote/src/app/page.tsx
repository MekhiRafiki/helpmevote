"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import TopicSelector from "@/components/TopicSelector"
import ChatArea from "@/components/ChatArea"
import { Topic } from "@/types"
import { TOPICS } from "@/constants/topics"


export default function PoliticalChat() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Help Me Vote</h1>

      <TopicSelector topics={TOPICS} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />

      {selectedTopic ? (<Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="mr-2" />
            {selectedTopic ? selectedTopic.title : 'Chat'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          
           <ChatArea selectedTopic={selectedTopic} /> 
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
