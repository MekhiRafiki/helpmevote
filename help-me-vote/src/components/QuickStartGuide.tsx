import { DoorOpen, Library, Play, SkipForward, Workflow } from "lucide-react";

export default function QuickStartGuide() {
    return (
        <div className="p-4 border rounded-md bg-gray-100 text-gray-800">
            <h3 className="font-semibold mb-2">So you know...</h3>
            <p>We&apos;ve planned out an agenda on this topic.</p>
            <ul className="list-disc pl-5 space-y-2">
                <li className="flex items-center">
                    <Workflow className="h-4 w-4 mr-2" />
                    <span>Use to view the current topic and the agenda.</span>
                </li>
                <li className="flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    <span>Use to get starter prompts for the current topic.</span>
                </li>
                <li className="flex items-center">
                    <SkipForward className="h-4 w-4 mr-2" />
                    <span>Use when you&apos;re ready to move to the next topic.</span>
                </li>
                <li className="flex items-center">
                    <Library className="h-4 w-4 mr-2" />
                    <span>Will be shown when we have used credible information for that chat conversation to remain factual.</span>
                </li>
                <li className="flex items-center">
                    <DoorOpen className="h-4 w-4 mr-2" />
                    <span>You can exit the platform at any time using the exit button.</span>
                </li>
            </ul>
            <p className="mt-2 text-sm">
                Reminder: while the AI assistant is complemented with factual information, LLMs may still hallucinate and state wrong or misleading information.
            </p>
        </div>
    );
}