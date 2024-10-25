import { DoorOpen, Library, Play, SkipForward, Workflow } from "lucide-react";

export default function QuickStartGuide() {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="max-w-md p-6 text-center">
                <h3 className="font-semibold mb-4 text-xl md:text-2xl">So you know...</h3>
                <p className="text-sm md:text-base mb-4">We&apos;ve planned out an agenda on this topic.</p>
                <ul className="space-y-3 text-left">
                    <li className="flex items-center gap-3">
                        <Workflow className="flex-shrink-0 text-primary" />
                        <p className="text-sm md:text-base">Use to view the current topic and the agenda.</p>
                    </li>
                    <li className="flex items-center gap-3">
                        <Play className="flex-shrink-0 text-primary" />
                        <p className="text-sm md:text-base">Use to get starter prompts for the current topic.</p>
                    </li>
                    <li className="flex items-center gap-3">
                        <SkipForward className="flex-shrink-0 text-primary" />
                        <p className="text-sm md:text-base">Use when you&apos;re ready to move to the next topic.</p>
                    </li>
                    <li className="flex items-center gap-3">
                        <Library className="flex-shrink-0 text-primary" />
                        <p className="text-sm md:text-base">Shown when we&apos;ve used credible information to remain factual.</p>
                    </li>
                    <li className="flex items-center gap-3">
                        <DoorOpen className="flex-shrink-0 text-primary" />
                        <p className="text-sm md:text-base">Exit the platform at any time using the exit button.</p>
                    </li>
                </ul>
                <p className="mt-4 text-xs md:text-sm text-gray-500 italic">
                    Note: While the AI assistant uses factual information, it may still provide incorrect or misleading information.
                </p>
            </div>
        </div>
    );
}