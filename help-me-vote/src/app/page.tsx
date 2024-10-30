"use client"
import KnowledgeBaseSelector from "@/components/KnowledgeBase/KbSelector"
import TopicSelector from "@/components/TopicSelector"
import Image from "next/image"

export default function PoliticalChat() {

  return (
    <div className="min-w-screen min-h-screen px-6 md:px-12 pt-8 pb-1 flex flex-col overflow-hidden bg-gradient-to-br from-base-300 to-base-200">
      <div className="flex flex-row items-center justify-start gap-4 mb-8">
        <Image 
          src="/logo.png" 
          alt="Help Me Vote Logo" 
          width={120} 
          height={120} 
          className="hover:scale-105 transition-transform" 
        />
        <h1 className="text-start text-3xl md:text-4xl font-bold text-base-content">
          Help Me Vote
        </h1>
      </div>
      <div className="bg-base-100 rounded-xl p-6 shadow-lg mb-8 hover:shadow-xl transition-shadow">
        <h2 className="text-start text-xl font-semibold mb-3 text-base-content flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-primary rounded-full"></span>
          Platforms
        </h2>
        <p className="text-start text-sm mb-6 text-base-content/80">
          Conversational chat backed by context from trusted sources
        </p>
        <KnowledgeBaseSelector />
      </div>
      <div className="bg-base-100 rounded-xl p-6 shadow-lg mb-12 hover:shadow-xl transition-shadow">
        <h2 className="text-start text-xl font-semibold mb-3 text-base-content flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-secondary rounded-full"></span>
          Agendas
        </h2>
        <p className="text-start text-sm mb-6 text-base-content/80">
          Curated conversations with agendas
        </p>
        <TopicSelector />
      </div>
    </div>
  )
}
