"use client"

import { addResourceToKnowledgeBase } from "@/actions/embed";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function AddUrlModal() {
    const [url, setUrl] = useState('');

    const handleAddUrl = () => {
        console.log('Client: Handling add url', url);
        void addResourceToKnowledgeBase(url);
        
    }

    return (
      <>
      <button 
              className="btn btn-primary btn-sm" 
              onClick={() => (document.getElementById('add_url_modal') as HTMLDialogElement)?.showModal()}
            >
        <PlusIcon className="w-4 h-4" />
      </button>
      <dialog id="add_url_modal" className="modal">
        <div className="modal-box">
        <h3 className="font-bold text-lg">Add New URL</h3>
        <div className="form-control mt-4">
          <input 
            type="url" 
            className="input input-bordered" 
            placeholder="Enter URL to add to knowledge base..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Cancel</button>
            <button className="btn btn-primary ml-2" onClick={handleAddUrl}>Add URL</button>
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