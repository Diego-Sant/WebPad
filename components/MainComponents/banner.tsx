import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { ConfirmModal } from '../modals/confirm-modal';

interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deletando bloco de notas...",
            success: "Bloco de notas deletado com sucesso!",
            error: "Falha ao deletar o bloco de notas!"
        });

        router.push("/inicio")
    }

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restaurando bloco de notas...",
            success: "Bloco de notas restaurado com sucesso!",
            error: "Falha ao restaurar o bloco de notas!"
        })
    }
  
    return (
    <div className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
      <p>Esse bloco de notas está na lixeira.</p>

      <Button size="sm" onClick={onRestore} variant="outline" className='border-white bg-transparent hover:bg-primary/30 text-white hover:text-white p-1 px-2 h-auto font-normal'>
        Restaurar bloco de notas
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button size="sm" variant="outline" className='border-white bg-transparent hover:bg-primary/30 text-white hover:text-white p-1 px-2 h-auto font-normal'>
            Deletar bloco de notas
        </Button>
      </ConfirmModal>
    </div>
  )
}