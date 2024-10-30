import { BookOpenIcon } from "lucide-react";
import { Button } from "./ui/button";
import { KNOWLEDGE_BASES } from "@/constants/topics";
import { useRouter } from "next/navigation";


export default function KnowledgeBase() {
    const router = useRouter()
    const currentKnowledgeBaseId = "1"
    const kb = KNOWLEDGE_BASES.find((kb) => kb.id === currentKnowledgeBaseId)

    const visitKnowledgeBase = () => {
        router.push(`/rag/base/${currentKnowledgeBaseId}`)
    }
    return (
        <div>
            <Button 
                onClick={() => (document.getElementById('library_modal') as HTMLDialogElement)?.showModal()} 
                variant="ghost" 
                size="sm"
                className="text-base-content bg"
    >
                <BookOpenIcon className="text-base-content"/>
            </Button>
            <dialog id="library_modal" className="modal">
                <div className="modal-box flex flex-col gap-2">
                    <h3 className="font-bold text-lg text-base-content">Knowledge Base</h3>
                    <div className="flex flex-col gap-2">
                        {kb && (
                            <div key={kb.id} className="flex flex-col gap-2">
                                <h4 className="font-bold text-lg text-base-content">{kb.title}</h4>
                                <p className="text-sm text-base-content">{kb.description}</p>
                            </div>
                        )}
                    </div>
                    <button className="btn btn-primary" onClick={visitKnowledgeBase}>Visit Knowledge Base</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

{/* <button className="btn btn-primary btn-sm" onClick={() => dispatch(setViewLibrary(true))}>
<BookOpenIcon className="w-4 h-4" />
</button> */}