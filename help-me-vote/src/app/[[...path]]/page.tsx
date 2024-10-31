import KnowledgeBaseSelector from "@/components/KnowledgeBase/KbSelector"
import Image from "next/image"

export default function DynamicPath() {
  return (
    <>
        <div className="flex flex-row items-center justify-start gap-4">
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
        <KnowledgeBaseSelector />
    </>
  )
}