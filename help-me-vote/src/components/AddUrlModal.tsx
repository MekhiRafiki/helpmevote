"use client"

import { addResourceToKnowledgeBase } from "@/actions/embed";
import { addKnowledgeBase } from "@/lib/features/knowledgeBases/kbSlice";
import { useAppDispatch } from "@/lib/hooks";
import { KnowledgeBase } from "@/types";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface AddUrlModalProps {
  knowledgeBaseId?: number
}

export default function AddUrlModal({
  knowledgeBaseId
}: AddUrlModalProps) {
    const dispatch = useAppDispatch()
    const [url, setUrl] = useState('');

    const handleAddUrl = () => {
        console.log('Client: Handling add url', url);
        void addResourceToKnowledgeBase(url, knowledgeBaseId).then((kb) => {
          if (kb) {
            dispatch(addKnowledgeBase(kb as KnowledgeBase));
          }
        });
        
    }

    return (
      <>
      <button 
              className="btn btn-secondary btn-sm text-secondary-content" 
              onClick={() => (document.getElementById('add_url_modal') as HTMLDialogElement)?.showModal()}
            >
        <PlusIcon className="w-4 h-4" />
      </button>
      <dialog id="add_url_modal" className="modal">
        <div className="modal-box">
        <h3 className="font-bold text-lg text-base-content">Add New URL</h3>
        <div className="form-control mt-4">
          <input 
            type="url" 
            className="input input-bordered text-base-content" 
            placeholder="Enter URL to add to knowledge base..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost text-base-content">Cancel</button>
            <button className="btn btn-primary ml-2 text-primary-content" onClick={handleAddUrl}>Add URL</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
      </>
    )
  }