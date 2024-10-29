import AddUrlModal from "@/components/AddUrlModal";
import { KNOWLEDGE_BASES } from "@/constants/topics";

export default function RAGBasePage({ params }: { params: { id: string } }) {
    const isNew = params.id === 'new';
    const kb = KNOWLEDGE_BASES.find((kb: any) => kb.id === params.id);
  
    return (
      <div className="p-8 min-h-screen min-w-screen flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-8">
          <a href="/rag" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-3xl font-bold">
            {isNew ? 'Create Knowledge Base' : 'Knowledge Base'}
          </h1>
        </div>
  
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input 
            type="text" 
            className="input input-bordered" 
            placeholder="Knowledge Base Title"
            defaultValue={kb?.title}
          />
        </div>
  
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea 
            className="textarea textarea-bordered h-24" 
            placeholder="An engaging description of the knowledge base..."
            defaultValue={kb?.description}
          />
        </div>
  
        <div className="mt-6 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Context Items</h2>
            <AddUrlModal />
          </div>
          <div className="space-y-3 max-h-[40vh] overflow-y-auto">
            {kb?.contextItems.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2 bg-accent p-2 rounded-md">
                <a href={item.url} target="_blank">{item.url}</a>
              </div>
            ))}
          </div>
        </div>
  
        {!isNew && (
          <div className="w-full flex justify-center mt-auto pt-4">
          <a 
            href="/chat" 
            className="btn btn-secondary btn-md"
          >
            Chat with Knowledge Base
            </a>
          </div>
        )}
        
      </div>
    );
  }

