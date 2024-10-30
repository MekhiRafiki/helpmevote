"use client"
import KnowledgeBaseSelector from "@/components/KnowledgeBase/KbSelector"
import TopicSelector from "@/components/TopicSelector"


export default function PoliticalChat() {

  return (
    <div className="min-w-screen min-h-screen px-4 pt-8 pb-1 flex flex-col overflow-hidden bg-base-300">
      <div className="mb-12">
      <h2 className="text-start text-lg font-semibold mb-4 text-base-content">Agendas</h2>
        <TopicSelector />
        {/* <p className="text-center text-gray-500 mb-8">
          Curated conversations with agendas
        </p> */}
      </div>
      
      <div className="my-8 border-t border-base-content/10 pt-8">
        <h2 className="text-start text-lg font-semibold mb-4 text-base-content">Chat with Platforms</h2>
        <KnowledgeBaseSelector />
      </div>
    </div>
  )
}
