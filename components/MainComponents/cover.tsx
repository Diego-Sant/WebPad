"use client";

import { cn } from "@/lib/utils";

import Image from "next/image";

import { useParams } from "next/navigation";

import { Button } from "../ui/button";

import { ImageIcon, X } from "lucide-react";

import { useCoverImage } from "@/hooks/useCoverImage";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface CoverProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
    const params = useParams();
    
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);
    
    const onRemove = () => {
        removeCoverImage({
            id: params.documentId as Id<"documents">
        })
    }

    return (

        <div className={cn("relative w-full h-[35vh] group", 
        !url && "h-[12vh]",
        url && "bg-muted"
        )}>

            {!!url && (
                <Image src={url} fill alt="Imagem selecionada" className="object-cover" />
            )}

            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button onClick={coverImage.onOpen} className="text-muted-foreground text-xs" variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Mudar imagem de fundo
                    </Button>
                    <Button onClick={onRemove} className="text-muted-foreground text-xs" variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Remover imagem de fundo
                    </Button>
                </div>
            )}

        </div>

    );
}