"use client"
import { createKnowledgeBase, fetchKnowledgeBaseById, getAllResources, getResourcesInKb } from "@/actions/resources";
import AddUrlModal from "@/components/AddUrlModal";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { ChevronDownIcon, CircleArrowLeft, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RAGBasePage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const isNew = params.id === 'new'

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [contextItems, setContextItems] = useState([]);

      useEffect(() => {
        async function fetchKnowledgeBase() {
          if (!isNew) {
            if (params.id !== "home") {
              const id = parseInt(params.id)
              await fetchKnowledgeBaseById(id).then((kb) => {
                  if (kb) {
                      setName(kb[0].name || "");
                      setDescription(kb[0].description || "");
                  } else {
                    router.push("/rag/");
                  }
              });
            } else {
              setName("General Chat")
              setDescription("Chat with the platform about anything")
            }
          }
        }

        async function fetchResourcesInKb() {
          if (!isNew) {
            const resources = params.id === "home" ? await getAllResources() : await getResourcesInKb(parseInt(params.id));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setContextItems(resources as any);
          }
        }
        void fetchKnowledgeBase();
        void fetchResourcesInKb();
      }, [params.id, isNew, router, dispatch]);
  
    return (
      <div className="min-w-screen min-h-screen px-6 md:px-12 pt-8 pb-1 flex flex-col overflow-hidden bg-gradient-to-br from-base-300 to-base-200">
        <div className="flex flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()} 
              className="btn btn-ghost btn-circle text-base-content hover:bg-base-200"
            >
              <CircleArrowLeft />
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              {isNew ? 'Create Knowledge Base' : 'Knowledge Base'}
            </h1>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-1.5 h-6 bg-primary rounded-full"></span>
            <h2 className="text-xl font-semibold text-base-content">Details</h2>
          </div>

          <div className="space-y-6">
            <div className="form-control">
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
                <span className="label-text text-base-content font-medium">Description</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24 text-base-content" 
                placeholder="An engaging description of the knowledge base..."
                value={description}
                disabled={!isNew}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
  
        {isNew ? (
          <div className="w-full flex flex-row justify-end">
            <Button 
              disabled={!name || !description} 
              onClick={() => {
                createKnowledgeBase(name, description).then((kb) => {
                  router.push(`/rag/base/${kb.id}`);
                });
              }}
              className="btn btn-primary"
            >
              Create Knowledge Base
            </Button>
          </div>
        ) : (
          <div className="bg-base-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-6 bg-secondary rounded-full"></span>
                <h2 className="text-xl font-semibold text-base-content">Context Items</h2>
              </div>
              {process.env.NEXT_PUBLIC_ENVIRONMENT === "development" && (
                <AddUrlModal knowledgeBaseId={parseInt(params.id)}/>
              )}
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto px-2">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {contextItems.map((item: any, index: number) => (
                <div 
                  key={index} 
                  className="card bg-base-200 shadow-sm hover:shadow-md transition-all "
                >
                  <div className="card-body p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="card-title text-base-content text-lg">{item.title}</h3>
                      <button 
                        className="btn btn-ghost btn-sm" 
                        onClick={() => {
                          const element = document.getElementById(`content-${index}`);
                          element?.classList.toggle('hidden');
                        }}
                      >
                        <ChevronDownIcon className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div id={`content-${index}`} className="hidden">
                      <p className="text-base-content/80 text-sm mt-2 max-h-48 overflow-y-auto line-clamp-10">
                        {item.content || "No preview available"}
                      </p>

                      {item.webUrl && (
                        <div className="card-actions justify-end mt-2">
                          <a 
                            href={item.webUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-primary btn-sm"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {!isNew && (
          <div className="w-full flex justify-center mt-8">
            <a 
              href={`/chat/${params.id}`} 
              className="btn btn-primary btn-lg text-primary-content"
            >
              Chat with Knowledge Base
            </a>
          </div>
        )}
      </div>
    );
}

