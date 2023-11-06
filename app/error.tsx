"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src="/error.jpg" height="300" width="300" alt="Erro 404" className="dark:hidden" />
            <Image src="/error-dark.png" height="300" width="300" alt="Erro 404" className="hidden dark:block" />
            <h2 className="text-xl font-medium">Algo de errado aconteceu!</h2>
            <Button asChild>
                <Link href="/inicio">
                    Voltar ao menu principal
                </Link>
            </Button>
        </div>
    );
}
 
export default Error;