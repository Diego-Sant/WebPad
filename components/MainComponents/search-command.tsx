"use client";

import { useState, useEffect } from "react";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react"

import { useUser } from "@clerk/clerk-react";

import { useRouter } from "next/navigation";

import { useSearch } from "@/hooks/useSearch";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

import { File } from "lucide-react";

export const SearchCommand = () => {
    const { user } = useUser();

    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);

    const [isMounted, setIsMounted] = useState(false); // Previnir hydration

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, [toggle])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    const onSelect = (id: string) => {
        router.push(`/inicio/${id}`);
        onClose();
    }
    
    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>

            <CommandInput placeholder={`Pesquisar documentos de ${user?.fullName}...`} />
            
            <CommandList>

                <CommandEmpty>Sem resultados da pesquisa.</CommandEmpty>

                <CommandGroup heading="Documentos">
                    {documents?.map((document) => (
                        <CommandItem className="cursor-pointer" key={document._id} value={`${document._id}-${document.title}`} title={document.title} onSelect={onSelect}>
                            
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">
                                    {document.icon}
                                </p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}

                            <span>
                                {document.title}
                            </span>

                        </CommandItem>
                    ))}
                </CommandGroup>

            </CommandList>

        </CommandDialog>
    );
}