"use client"
import { createKnowledgeBase, fetchKnowledgeBaseById } from "@/actions/resources";
import AddUrlModal from "@/components/AddUrlModal";
import { Button } from "@/components/ui/button";
import { KNOWLEDGE_BASES } from "@/constants/topics";
import { addKnowledgeBase } from "@/lib/features/knowledgeBases/kbSlice";
import { useAppDispatch } from "@/lib/hooks";
import { KnowledgeBase } from "@/types";
import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RAGBasePage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const isNew = params.id === 'new'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [kb, setKb] = useState<any>(null)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [contextItems, setContextItems] = useState<any[]>(KNOWLEDGE_BASES[0].contextItems);
    // kb?.contextItems

      useEffect(() => {
        async function fetchKnowledgeBase() {
          if (!isNew) {
              await fetchKnowledgeBaseById(parseInt(params.id)).then((kb) => {
                  if (kb) {
                      setKb(kb[0]);
                      setName(kb[0].name || "");
                      setDescription(kb[0].description || "");
                      dispatch(addKnowledgeBase(kb[0] as KnowledgeBase));
                  } else {
                    router.push("/rag/");
                  }
              });
          }
        }
        fetchKnowledgeBase();
      }, [params.id, isNew, router, dispatch]);
  
    return (
      <div className="p-8 min-h-screen min-w-screen flex flex-col gap-4 bg-base-100">
        <div className="flex items-center gap-2 mb-8">
          <button onClick={() => router.back()} className="btn btn-ghost btn-circle text-base-content">
            <CircleArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-base-content">
            {isNew ? 'Create Knowledge Base' : 'Knowledge Base'}
          </h1>
        </div>
  
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base-content">Name</span>
          </label>
          <input 
            type="text" 
            className="input input-bordered text-base-content" 
            placeholder="Knowledge Base Name"
            value={name}
            disabled={!isNew}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
  
        <div className="form-control">
          <label className="label">
            <span className="label-text text-base-content">Description</span>
          </label>
          <textarea 
            className="textarea textarea-bordered h-24 text-base-content" 
            placeholder="An engaging description of the knowledge base..."
            value={description}
            disabled={!isNew}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
  
       {isNew ? (
        <div className="w-full flex  flex-row justify-end">
            <Button disabled={!name || !description} onClick={() => {
                createKnowledgeBase(name, description).then((kb) => {
                    router.push(`/rag/base/${kb.id}`);
                });
            }}>Create Knowledge Base</Button>
        </div>
       ): (<div className="mt-6 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-base-content">Context Items</h2>
            <AddUrlModal />
          </div>
          <div className="space-y-3 max-h-[40vh] overflow-y-auto">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {contextItems.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2 bg-base-300 p-2 rounded-md hover:bg-base-200">
                <a href={item.url} target="_blank" className="text-base-content">{item.url}</a>
              </div>
            ))}
          </div>
        </div>)}
  
        {!isNew && (
          <div className="w-full flex justify-center mt-auto pt-4">
          <a 
            href={`/chat/${params.id}`} 
            className="btn btn-primary btn-md text-secondary-content"
          >
            Chat with Knowledge Base
            </a>
          </div>
        )}
        
      </div>
    );
  }

