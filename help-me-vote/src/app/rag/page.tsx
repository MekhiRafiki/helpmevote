"use client"

import { selectKnowledgeBases } from "@/lib/features/knowledgeBases/kbSlice";
import { useAppSelector } from "@/lib/hooks";
import { MessageCircleHeart, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";


export default function RAG() {
    const router = useRouter();
    const knowledgeBases = useAppSelector(selectKnowledgeBases);

    return (
      <div className="p-4 min-w-full flex flex-col gap-4">        
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Knowledge Bases</h2>
              <button className="btn btn-primary btn-sm" onClick={() => router.push('/rag/new')}>
                <PlusIcon className="w-4 h-4" />    
              </button>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary btn-sm max-w-32" onClick={() => router.push('/')}>
                <MessageCircleHeart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <input
          type="search"
          placeholder="Search"
          className="input input-bordered w-full shadow-md"
        />
  
        <div className="space-y-3 p-4 flex flex-col gap-4">
          <button
              className="btn btn-accent btn-lg text-accent-content"
              onClick={() => router.push(`/rag/home`)}
          >
              General Chat
          </button>
          {knowledgeBases.map((kb, index) => (
            <button
              key={index}
              className="btn btn-accent btn-lg text-accent-content"
              onClick={() => router.push(`/rag/${kb.id}`)}
            >
              {kb.name}
            </button>
          ))}
        </div>
      </div>
    );
  }