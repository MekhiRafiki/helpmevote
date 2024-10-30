import { KNOWLEDGE_BASES } from "@/constants/topics";
import { useRouter } from "next/navigation";

export default function KnowledgeBaseSelector() {

    const router = useRouter();

    const handleKnowledgeBaseSelect = (kbId: string) => {
        router.push(`/chat/${kbId}`);
    }

    return (
        <div className="flex flex-col p-3 hover:bg-base-200 cursor-pointer rounded-lg">
            {KNOWLEDGE_BASES.map((kb) => (
                <div key={kb.id} 
                    className="flex flex-col p-3 hover:bg-base-300 cursor-pointer rounded-lg"
                    onClick={() => handleKnowledgeBaseSelect(kb.id)}
                >
                    <h3 className="font-semibold text-base-content">{kb.title}</h3>
                    <p className="text-sm text-base-content/70 line-clamp-1">{kb.description}</p>
                </div>
            ))}
        </div>
    );
}