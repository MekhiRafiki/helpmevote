import { Workflow } from "lucide-react";
import { Button } from "./ui/button";
import { ConversationAgenda } from "@/types";
import { usePostHog } from "posthog-js/react";

interface PlanDisplayProps {
    agenda: ConversationAgenda | undefined
    currentNodeIndex: number
}

export default function PlanDisplay({ agenda, currentNodeIndex }: PlanDisplayProps) {
    const posthog = usePostHog();

    const handlePlanModalOpen = () => {
        (document.getElementById('plan_modal') as HTMLDialogElement)?.showModal()
        posthog.capture('conversation_plan_modal_opened')
    }
    if (!agenda) return null;
    return (
        <>
            <Button onClick={handlePlanModalOpen} variant="outline" size="sm">
                <Workflow />
            </Button>
            <dialog id="plan_modal" className="modal">
                <div className="modal-box flex flex-col gap-2">
                    <h3 className="font-bold text-lg">{agenda.title}</h3>
                    <ul>
                        {agenda.plan.nodes.map((node, index) => (
                            <li key={index} className="mb-2">
                                <div className="flex flex-row justify-between items-center">
                                    <h4 className="font-semibold">{node.title}</h4>
                                    {index === currentNodeIndex && (<span className={`indicator-item indicator-start badge badge-primary badge-sm`}>Current</span>)}
                                </div>
                                <p>{node.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}