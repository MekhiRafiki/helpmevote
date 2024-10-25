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
            <div>
                <Button 
                    onClick={() => (document.getElementById('library_modal') as HTMLDialogElement)?.showModal()} 
                    variant="ghost" 
                    size="sm"
                    className="text-base-content bg"
                >
                    <Library className="text-base-content"/>
                </Button>
            </div>
            <dialog id="library_modal" className="modal">
                <div className="modal-box flex flex-col gap-2">
                    <h3 className="font-bold text-lg text-base-content">Supporting Information</h3>
                    <ul>
                        {usedNotionUrls.map((url, index) => (
                            <li key={index} className="mb-2 flex items-center">
                                <Link className="h-4 w-4 mr-2 text-base-content" />
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-info underline"
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