import { DoorOpen, Library, Play, SkipForward, Workflow } from "lucide-react";

export default function QuickStartGuide() {
    return (
        <div className="p-4 border rounded-md bg-gray-100 text-gray-800">
            <h3 className="font-semibold mb-2 text-lg md:text-xl">So you know...</h3>
            <p className="text-sm md:text-base">We&apos;ve planned out an agenda on this topic.</p>
            <ul className="list-disc pl-5 space-y-2">
                <li className="flex items-center gap-2">
                    <Workflow />
                    <p className="text-sm md:text-base">Use to view the current topic and the agenda.</p>
                </li>
                <li className="flex items-center gap-2">
                    <Play />
                    <p className="text-sm md:text-base">Use to get starter prompts for the current topic.</p>
                </li>
                <li className="flex items-center gap-2">
                    <SkipForward />
                    <p className="text-sm md:text-base">Use when you&apos;re ready to move to the next topic.</p>
                </li>
                <li className="flex items-center gap-2">
                    <Library />
                    <p className="text-sm md:text-base">Will be shown when we have used credible information for that chat conversation to remain factual.</p>
                </li>
                <li className="flex items-center gap-2">
                    <DoorOpen />
                    <p className="text-sm md:text-base">You can exit the platform at any time using the exit button.</p>
                </li>
            </ul>
            <p className="mt-2 text-xs md:text-sm">
                Reminder: while the AI assistant is complemented with factual information, LLMs may still hallucinate and state wrong or misleading information.
            </p>
        </div>
    );
}