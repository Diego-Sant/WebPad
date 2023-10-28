"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useUser } from "@clerk/clerk-react";

import { cn } from "@/lib/utils";

import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, PlusIcon, Trash } from "lucide-react";

import { Skeleton } from "../ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { useRouter } from "next/navigation";

import { toast } from "sonner";


interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick: () => void;
    icon: LucideIcon;
}

export const Item = ({ id, documentIcon, active, expanded, isSearch, level = 0, onExpand, label, onClick, icon: Icon} : ItemProps) => {
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    const create = useMutation(api.documents.create);
    const router = useRouter();

    const archive = useMutation(api.documents.archive);

    const { user } = useUser();

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();

      if (!id) return;

      const promise = archive({ id });

      toast.promise(promise, {
          loading: "Movendo para a lixeira...",
          success: "Bloco de notas enviado para a lixeira com sucesso!",
          error: "Falha ao excluir o bloco de notas!"
      })
    }

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();

      onExpand?.();
    }

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();

      if (!id) return;

      const promise = create({ title: "Sem título", parentDocument: id })
        .then((documentId) => {
          if(!expanded) {
            onExpand?.();
          }
          //router.push(`/inicio/${documentId}`);
        });

        toast.promise(promise, {
          loading: "Criando um bloco de notas...",
          success: "Bloco de notas criado com sucesso!",
          error: "Falha ao criar o bloco de notas!"
        })
    }
  
    return (
    <div onClick={onClick} role="button"
        style={{ paddingLeft: level ? `${(level * 12) + 12}px` : "12px" }}
        className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium", 
        active && "bg-primary/5 text-primary"
    )}>
      
      {!!id && (
        <div role="button" onClick={handleExpand} className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1">
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">
            {documentIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      
      <span className="truncate">
        {label}
      </span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">CTRL</span>+ K
        </kbd>
      )}

      {!!id && (
        <div role="button" onClick={onCreate} className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>

            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60" align="start" side="right" forceMount>

              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2 text-red-600" /> Excluir
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="text-xs text-muted-foreground p-2 line-clamp-1">
                Criado por {user?.fullName}
              </div>

            </DropdownMenuContent>
          </DropdownMenu>
          <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
            <PlusIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}

    </div>
  )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div style={{ paddingLeft: level ? `${(level * 12) + 25}px` : "12px" }} className="flex gap-x-2 py-[3px]">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  )
}
