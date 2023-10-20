"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Faça anotações sobre estudos, planos, trabalho e muito mais! Conheça{" "}
        <span className="underline">WebPad</span>
      </h1>
      <Button>
        Teste o WebPad <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
