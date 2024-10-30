import { selectKnowledgeBases } from "@/lib/features/knowledgeBases/kbSlice";
import { useAppSelector } from "@/lib/hooks";
import { KnowledgeBase } from "@/types";
import { useRouter } from "next/navigation";

export default function KnowledgeBaseSelector() {
    const knowledgeBases = useAppSelector(selectKnowledgeBases);
    return (
        <div className="flex flex-col gap-2">
            <KnowledgeBaseCard key={-1} kb={{
                name: "General Chat",
                description: "Chat with the platform about anything",
                id: "home"
            }} />
            {knowledgeBases.map((kb) => (
                <KnowledgeBaseCard key={kb.id} kb={kb} />
            ))}
        </div>
    );
}

function KnowledgeBaseCard({ kb }: { kb: KnowledgeBase }) {
    const router = useRouter();
    const handleKnowledgeBaseSelect = (kbId: number | string) => {
        router.push(`/chat/${kbId}`);
    }
    return (
        <div className="flex flex-col p-3 hover:bg-base-200 cursor-pointer rounded-lg"
            onClick={() => kb.id && handleKnowledgeBaseSelect(kb.id)}
        >
            <h3 className="font-semibold text-base-content">{kb.name}</h3>
            <p className="text-sm text-base-content/70 line-clamp-1">{kb.description}</p>
        </div>
    );
}