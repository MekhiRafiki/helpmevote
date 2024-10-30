import { ArrowRightIcon, BookOpenIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { selectKnowledgeBases } from "@/lib/features/knowledgeBases/kbSlice";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import { KnowledgeBase } from "@/types";
import { useEffect } from "react";


export default function KbQuickView({ kbId }: { kbId: string }) {
    const router = useRouter()
    const knowledgeBases = useAppSelector(selectKnowledgeBases)
    const [kb, setKb] = useState<KnowledgeBase | null>(null)

    useEffect(() => {
        setKb(knowledgeBases.find((kb) => kb.id === parseInt(kbId)) ?? null)
    }, [knowledgeBases, kbId])

    const visitKnowledgeBase = () => {
        router.push(`/rag/base/${kbId}`)
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
                    <div className="flex flex-col gap-2">
                        
                        <div className="flex flex-col gap-2">
                            <h4 className="font-bold text-lg text-base-content">{kb?.name ?? "Entire Knowledge Base"}</h4>
                            <p className="text-sm text-base-content">{kb?.description ?? "Any relevant context from our Help Me Vote knowledge base"}</p>
                        </div>
                        
                    </div>
                    <div className="flex justify-end">
                        <button className="btn btn-primary btn-md" onClick={visitKnowledgeBase}>
                            <ArrowRightIcon className="w-4 h-4" />
                        </button>
                    </div>
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