"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import IconPicker from "./icon-picker";
import { Button } from "../ui/button";

import { useCoverImage } from "@/hooks/useCoverImage";

import { ImageIcon, SmileIcon, X } from "lucide-react";

import { ElementRef, useRef, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
}
 
export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [iconSelected, setIconSelected] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const coverImage = useCoverImage();

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false)
    }

    const onInput = (value: string) => {
        setValue(value);

        update({
            id: initialData._id,
            title: value || "Sem título"
        })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    }

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon
        });

        setIconSelected(true);
    }

    const onRemoveIcon = () => {
        removeIcon({
            id: initialData._id
        });

        setIconSelected(false);
    }
    
    return (
        <div className={`pl-[54px] group relative pt-4 ${iconSelected ? 'flex items-center' : 'block'}`}>

            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon mr-3">
                    <Button onClick={onRemoveIcon} variant="outline" size="icon" className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs">
                        <X className="h-4 w-4" />
                    </Button>
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                </div>
            )}

            {!!initialData.icon && preview && (
                <p className="text-6xl">
                    {initialData.icon}
                </p>
            )}

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                   <IconPicker asChild onChange={onIconSelect}>
                        <Button variant="outline" size="sm" className="text-muted-foreground text-xs">
                            <SmileIcon className="h-4 w-4 mr-2" />
                            Adicionar emoji
                        </Button>
                   </IconPicker> 
                )}

            </div>

            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
                />
            ) : (
                <div onClick={enableInput} className="text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]">
                    {initialData.title}
                </div>
            )}

            {!initialData.coverImage && !preview && (
                <Button variant="outline" size="sm" onClick={coverImage.onOpen} className={`text-muted-foreground text-xs opacity-0 group-hover:opacity-100 ${iconSelected ? 'mt-1 ml-3' : 'mt-4'}`}>
                    <ImageIcon className="h-4 w-4 mr-2 " />
                    Adicionar imagem
                </Button>
            )}

        </div>
    );
}