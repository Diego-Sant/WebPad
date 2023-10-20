import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex-col flex sm:flex-row items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/documents.png"
            fill
            className="object-contain dark:hidden"
            alt="Documentos"
          />
          <Image
            src="/documents-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Documentos"
          />
        </div>
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/reading.png"
            fill
            className="object-contain dark:hidden"
            alt="Leitura"
          />
          <Image
            src="/reading-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Leitura"
          />
        </div>
      </div>
    </div>
  );
};
