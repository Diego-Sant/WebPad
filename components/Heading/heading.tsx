"use client";

import { useConvexAuth } from "convex/react";

import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export const Heading = () => {
  const {isAuthenticated, isLoading} = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Faça anotações sobre estudos, planos, trabalho e muito mais! Conheça{" "}
        <span className="underline">WebPad</span>
      </h1>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button>
          Teste o WebPad <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
