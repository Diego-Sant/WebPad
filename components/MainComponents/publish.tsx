"use client"

import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"

import { useState } from "react"

import { useOrigin } from "@/hooks/useOrigin"

import { toast } from "sonner"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Check, Copy, Globe } from "lucide-react"

interface PublishProps {
    initialData: Doc<"documents">
}

export const Publish = ({ initialData }: PublishProps) => {
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true
        }).finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Tornando seu bloco de notas público...",
            success: "Seu bloco de notas está publico com sucesso!",
            error: "Falha ao publicar o bloco de notas!"
        });
    }

    const onUnpublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false
        }).finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Tornando seu bloco de notas privado...",
            success: "Seu bloco de notas está privado com sucesso!",
            error: "Falha ao privar o bloco de notas!"
        });
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);

        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost">
                    
                    {initialData.isPublished ? (
                        <div className="flex items-center gap-x-1">
                            Público
                            <Globe className="text-sky-500 w-4 h-4 ml-2" />
                        </div>
                    ) : (
                        <div>
                            Compartilhar
                        </div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                            <p className="text-sky-500 text-xs font-medium">Esse bloco de notas está público.</p>
                        </div>
                        <div className="flex items-center">
                            <input value={url} disabled className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"/>
                            <Button onClick={onCopy} disabled={copied} className="h-8 rounded-l-none">
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button onClick={onUnpublish} size="sm" disabled={isSubmitting} className="w-full text-xs">Tornar privado</Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-2">Publicar esse bloco de notas</p>
                        <span className="text-xs text-muted-foreground mb-4">Compartilhe esse bloco de notas com outras pessoas!</span>
                        <Button disabled={isSubmitting} onClick={onPublish} size="sm" className="w-full text-xs">Compartilhar</Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}