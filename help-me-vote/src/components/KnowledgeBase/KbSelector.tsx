"use client"

import { BallotItem } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { BALLOT_STRUCTURE } from "@/constants/topics";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function KnowledgeBaseSelector() {
    const router = useRouter()
    const pathname = usePathname()
    const posthog = usePostHog()
    const [breadcrumbs, setBreadcrumbs] = useState<BallotItem[]>([])

    // New function to find item by path
    const findItemByPath = (path: string): BallotItem[] => {
        const segments = path.split('/').filter(Boolean)
        const items: BallotItem[] = []
        let currentLevel = BALLOT_STRUCTURE

        for (const segment of segments) {
            const item = currentLevel.find(i => i.id === segment)
            if (item) {
                items.push(item)
                currentLevel = item.children || []
            }
        }
        return items
    }

    // Initialize breadcrumbs based on URL
    useEffect(() => {
        const items = findItemByPath(pathname)
        setBreadcrumbs(items)
    }, [pathname])

    const handleItemSelect = (item: BallotItem) => {
        const newPath = [...breadcrumbs.map(b => b.id), item.id].join('/')
        if (item.children) {
            router.push(`/${newPath}`)
        } else {
            posthog.capture('knowledge_base_selected', {
                item: item.name
            })
            router.push(`/chat/${item.id}`)
        }
    }

    const navigateToBreadcrumb = (index: number) => {
        const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
        const newPath = newBreadcrumbs.map(b => b.id).join('/')
        router.push(`/${newPath}`)
    }

    const currentItems = breadcrumbs.length > 0 
        ? breadcrumbs[breadcrumbs.length - 1].children || []
        : BALLOT_STRUCTURE

    return (
        <div className="">
            <div className="flex flex-row items-center gap-2">
                <div className="breadcrumbs text-base text-base-content">
                    <ul>
                        <li>
                            <a 
                                onClick={() => setBreadcrumbs([])} 
                                className="text-base-content font-semibold"
                            >
                                All
                            </a>
                        </li>
                        {breadcrumbs.map((crumb, index) => (
                            <li key={crumb.id}>
                                <a 
                                    onClick={() => navigateToBreadcrumb(index)} 
                                    className="text-base-content"
                                >
                                    {crumb.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
                {currentItems.map((item) => (
                    <Button
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        variant="default"
                        size="lg"
                        className="justify-start bg-base-200 text-base-content hover:bg-base-300"
                    >
                        {item.name}
                        {item.children && <ChevronRight className="ml-2 h-4 w-4 text-base-content" />}
                    </Button>
                ))}
            </div>
        </div>
    )
}