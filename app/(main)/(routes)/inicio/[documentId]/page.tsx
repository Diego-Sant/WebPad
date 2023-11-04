"use client";

import { Cover } from "@/components/MainComponents/cover";
import { Toolbar } from "@/components/MainComponents/toolbar";
import { Spinner } from "@/components/ui/spinner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">,
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  });

  if (document === undefined) {
    return (
      <div className='flex items-center justify-center absolute inset-y-0 h-full w-full bg-background/80 z-50'>
        <Spinner size="lg" />
      </div>
    )
  }

  if (document === null) {
    return <div>Bloco de notas não encontrado.</div>
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  )
}

export default DocumentIdPage
