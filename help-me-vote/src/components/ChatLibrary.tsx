import { selectUsedNotionUrls } from "@/lib/features/chat/chatSlice";
import { useAppSelector } from "@/lib/hooks";
import { Library, Link } from "lucide-react";
import { Button } from "./ui/button";

export default function ChatLibrary() {
    const usedNotionUrls = useAppSelector(selectUsedNotionUrls)
    

    const extractTitleFromUrl = (url: string) => {
        const match = url.match(/\/([^\/]+)-[a-z0-9]+$/i);
        return match ? match[1].replace(/-/g, ' ') : 'Notion Page';
    };

    return (
        <>
            <div className="indicator">
                <span className="indicator-item indicator-start badge badge-primary badge-sm">{usedNotionUrls.length}</span>
                <Button onClick={() => (document.getElementById('library_modal') as HTMLDialogElement)?.showModal()} variant="outline" size="sm">
                    <Library />
                </Button>
            </div>
            <dialog id="library_modal" className="modal">
                <div className="modal-box flex flex-col gap-2">
                    <h3 className="font-bold text-lg">Supporting Information</h3>
                    <ul>
                        {usedNotionUrls.map((url, index) => (
                            <li key={index} className="mb-2 flex items-center">
                                <Link className="h-4 w-4 mr-2" />
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    {extractTitleFromUrl(url)}
                                </a>
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