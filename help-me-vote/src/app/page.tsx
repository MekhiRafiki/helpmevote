"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import TopicSelector from "@/components/TopicSelector"
import ChatArea from "@/components/ChatArea"
import { Topic } from "@/types"


export default function PoliticalChat() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Political Chat Assistant</h1>

      <TopicSelector selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="mr-2" />
            {selectedTopic ? selectedTopic.title : 'Chat'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedTopic ? (
           <ChatArea selectedTopic={selectedTopic} /> 
          ) : (
            <p className="text-center text-gray-500">
              Please select a topic to start chatting.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
