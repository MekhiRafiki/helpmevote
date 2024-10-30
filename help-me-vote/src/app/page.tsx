"use client"
import TopicSelector from "@/components/TopicSelector"


export default function PoliticalChat() {

  return (
    <div className="min-w-screen min-h-screen px-4 pt-4 pb-1 flex flex-col overflow-hidden bg-base-300">
      <TopicSelector />
      <p className="text-center text-gray-500">
        Please select a topic to start chatting.
      </p>
    </div>
  )
}
