'use client'

import { MessageCircleHeart, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectKnowledgeBases } from "@/lib/features/knowledgeBases/kbSlice";
import Image from "next/image";

export const dynamic = 'force-dynamic';


export default function RAG() {
  const router = useRouter();
  const knowledgeBases = useAppSelector(selectKnowledgeBases);

  return (
    <div className="min-w-screen min-h-screen px-6 md:px-12 pt-8 pb-1 flex flex-col overflow-hidden bg-gradient-to-br from-base-300 to-base-200">
      <div className="flex flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Image 
            src="/logo.png" 
            alt="Help Me Vote Logo" 
            width={120} 
            height={120} 
            className="hover:scale-105 transition-transform" 
          />
          <h1 className="text-start text-3xl md:text-4xl font-bold text-base-content">
            Knowledge Bases
          </h1>
        </div>
        <div className="flex gap-2">
          <button 
            className="btn btn-primary btn-sm tooltip tooltip-bottom" 
            data-tip="Back to Home"
            onClick={() => router.push('/')}
          >
            <MessageCircleHeart className="w-4 h-4" />
          </button>
          <button 
            className="btn btn-primary btn-sm tooltip tooltip-bottom" 
            data-tip="New Knowledge Base"
            onClick={() => router.push('/rag/new')}
          >
            <PlusIcon className="w-4 h-4" />    
          </button>
        </div>
      </div>

      {/* <div className="bg-base-100 rounded-xl p-6 shadow-lg mb-8 hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block w-1.5 h-6 bg-primary rounded-full"></span>
          <h2 className="text-xl font-semibold text-base-content">Search</h2>
        </div>
        
        <div className="form-control">
          <div className="input-group">
            <input
              type="search"
              placeholder="Search knowledge bases..."
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="btn btn-neutral btn-lg hover:scale-105 transition-transform"
            onClick={() => router.push(`/rag/home`)}
          >
            General Chat
          </button>
          
          {knowledgeBases.map((kb, index) => (
            <button
              key={index}
              className="btn btn-neutral btn-lg hover:scale-105 transition-transform"
              onClick={() => router.push(`/rag/${kb.id}`)}
            >
              {kb.name}
            </button>
        ))}
      </div>
    </div>
  );
}