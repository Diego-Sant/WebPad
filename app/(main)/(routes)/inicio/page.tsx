"use client"

import { Button } from "@/components/ui/button";

import { useUser } from "@clerk/clerk-react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { PlusCircle } from "lucide-react";

import { toast } from "sonner";

import Image from "next/image";

const MainDocumentsPage = () => {
  const { user } = useUser();
  const create  = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Sem título"});

    toast.promise(promise, {
      loading: "Criando um bloco de notas...",
      success: "Bloco de notas criado com sucesso!",
      error: "Falha ao criar o bloco de notas!"
    })
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src="/empty.png" height="300" width="300" alt="Página vazia" className="dark:hidden" />
      <Image src="/empty-dark.png" height="300" width="300" alt="Página vazia" className="hidden dark:block" />

      <h2 className="text-lg font-medium">Bem vindo {user?.firstName}!</h2>

      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" /> Criar um bloco de notas
      </Button>
    </div>
  )
}

export default MainDocumentsPage