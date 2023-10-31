"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { useRef, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PenLine } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface TitleProps {
    initialData: Doc<"documents">;
}

export const Title = ({ initialData }: TitleProps) => {
    const update = useMutation(api.documents.update);

    const inputRef = useRef<HTMLInputElement>(null);
    
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialData.title || "Sem título");

    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);

        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0);
    }

    const disableInput = () => {
        setIsEditing(false);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);

        update({
            id: initialData._id,
            title: event.target.value || "Sem título"
        });

    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            disableInput();
        }
    }

    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}

            {isEditing ? (
                <Input ref={inputRef} onClick={enableInput} onBlur={disableInput} onChange={onChange} onKeyDown={onKeyDown} value={title} className="h-7 px-2 focus-visible:ring-transparent" />
            ) : (
                <Button onClick={enableInput} variant="ghost" size="sm" className="font-normal h-auto p-1">
                    <span className="truncate flex items-center gap-x-2">
                        {initialData?.title}
                        <PenLine className="w-4 h-4" />
                    </span>
                </Button>
            )}
        </div>
    )
}

Title.Skeleton = function TitleSkeleton() {
    return (
        <Skeleton className="h-7 w-40 rounded-md" />
    )
}