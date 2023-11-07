"use client"

import { Navigation } from "@/components/MainComponents/navigation";
import { SearchCommand } from "@/components/MainComponents/search-command";
import { Spinner } from "@/components/ui/spinner";

import { useConvexAuth } from "convex/react";

import { redirect } from "next/navigation";

const MainLayout = ({children} : {children: React.ReactNode}) => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    if (isLoading) {
        return (
            <div className=" items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return redirect("/")
    }
    
    return ( 
        <div className="h-full flex dark:bg-[#1f1f1f]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand />
                {children}
            </main>
        </div>
    );
}
 
export default MainLayout;