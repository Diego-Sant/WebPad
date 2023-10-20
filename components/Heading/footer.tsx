"use client";

import { Button } from "../ui/button"
import Logo from "./logo"

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background dark:bg-[#121212] z-50">
      <Logo />
      <div className="md:ml-auto w-full justify-center md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
            WebPad © Todos os direitos reservados
        </Button>
      </div>
    </div>
  )
}

export default Footer
