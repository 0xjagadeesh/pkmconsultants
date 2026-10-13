"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = { name: string; href: string };

export function StaticMobileMenu({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col px-0 sm:max-w-sm"
        showCloseButton={false}
      >
        <SheetHeader className="flex-row items-center justify-between border-b px-6 pb-4">
          <SheetTitle className="font-bold text-lg">
            PKM<span className="text-primary"> Consultants</span>
          </SheetTitle>
          <SheetClose className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        <nav className="grid content-start gap-1 overflow-y-auto px-4 pt-4" aria-label="Mobile navigation">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center rounded-md px-3 py-3 font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t px-4 pt-4 pb-4">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground text-sm transition-all hover:bg-primary/90"
          >
            Get in Touch
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
