"use client";

import { useCoverImage } from "@/hooks/useCoverImage";

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

import { useState } from "react";

import { useEdgeStore } from "@/lib/edgestore";

import { useParams } from "next/navigation";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "../edgestore/single-image-dropzone";

export const CoverImageModal = () => {
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { edgestore } = useEdgeStore();
    const coverImage = useCoverImage();

    const update = useMutation(api.documents.update);
    const params = useParams();

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                file
            });

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            });

            onClose();
        }
    }

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);

        coverImage.onClose();
    }

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Adicionar imagem
                    </h2>
                </DialogHeader>
                <SingleImageDropzone className="w-full outline-none" disabled={isSubmitting} value={file} onChange={onChange} />
            </DialogContent>
        </Dialog>
    )
}