"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { useUser } from "@clerk/clerk-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface MenuProps {
    documentId: Id<"documents">
}

export const Menu = ({ documentId }: MenuProps) => {
    const { user } = useUser();

    const router = useRouter();
    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({ id: documentId });

        toast.promise(promise, {
            loading: "Movendo para a lixeira...",
            success: "Bloco de notas enviado para a lixeira com sucesso!",
            error: "Falha ao excluir o bloco de notas!"
        });

        router.push("/inicio");
    }

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2 text-red-600" />
                    Excluir
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <div className="text-xs text-muted-foreground p-2 line-clamp-1">
                    Criado por {user?.fullName}
                </div>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-8 w-10" />
    )
}