"use client"

import { KNOWLEDGE_BASES } from "@/constants/topics";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";


export default function RAG() {
    const router = useRouter();
    
    return (
      <div className="p-4 min-w-full flex flex-col gap-4">        
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Knowledge Bases</h2>
              <button className="btn btn-primary btn-sm" onClick={() => router.push('/rag/base/new')}>
                <PlusIcon className="w-4 h-4" />    
              </button>
            </div>
          </div>
        </div>
        <input
              type="search"
              placeholder="Search"
              className="input input-bordered w-full shadow-md"
            />
  
            <div className="space-y-3">
              {KNOWLEDGE_BASES.map((kb, index) => (
                <button
                  key={index}
                  className="btn btn-primary w-full"
                  onClick={() => router.push(`/rag/base/${kb.id}`)}
                >
                  {kb.title}
                </button>
              ))}
            </div>
      </div>
    );
  }