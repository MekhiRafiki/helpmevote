import { selectUsedNotionUrls, selectViewLibrary } from "@/lib/features/chat/chatSlice";
import { useAppSelector } from "@/lib/hooks";
import { Link } from "lucide-react";

export default function ChatLibrary() {
    const usedNotionUrls = useAppSelector(selectUsedNotionUrls)
    const viewLibrary = useAppSelector(selectViewLibrary)

    const extractTitleFromUrl = (url: string) => {
        const match = url.match(/\/([^\/]+)-[a-z0-9]+$/i);
        return match ? match[1].replace(/-/g, ' ') : 'Notion Page';
    };


    if (!viewLibrary) {
        return null
    }

    return (
        <div className="p-4 border rounded-md mb-4">
            <h3 className="text-md font-semibold mb-2">Used Notion URLs</h3>
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
    )
}