
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/data";
import React from "react";

export function MainNav() {
  return (
    <>
      <Sidebar />
      <BottomNav />
    </>
  );
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow bg-primary text-primary-foreground border-r border-border overflow-y-auto">
        <div className="flex items-center justify-between flex-shrink-0 px-4 h-16">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold tracking-tight font-headline">
              Vizag Voyager
            </span>
          </Link>
        </div>
        <nav className="flex-1 flex flex-col gap-y-2 px-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                (pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-primary-foreground/10",
                "transition-colors duration-200"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 flex-shrink-0 h-6 w-6",
                   (pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href
                    ? "text-accent-foreground"
                    : "group-hover:text-primary-foreground"
                )}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function BottomNav() {
  const pathname = usePathname();
  const bottomNavItems = navItems.filter(item => item.label !== 'Profile');
  const profileNavItem = navItems.find(i => i.label === 'Profile');

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t border-border">
      <div className={cn("grid h-full max-w-lg mx-auto font-medium", `grid-cols-${bottomNavItems.length + (profileNavItem ? 1: 0)}`)}>
        {bottomNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-2 hover:bg-muted group",
                 (pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5 mb-1" aria-hidden="true" />
              <span className="text-xs">{item.label}</span>
            </Link>
        ))}
        {profileNavItem && (
            <Link
              key={profileNavItem.label}
              href={profileNavItem.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-2 hover:bg-muted group",
                pathname === profileNavItem.href ? "text-accent" : "text-muted-foreground"
              )}
            >
              <profileNavItem.icon className="w-5 h-5 mb-1" aria-hidden="true" />
              <span className="text-xs">{profileNavItem.label}</span>
            </Link>
        )}
      </div>
    </div>
  );
}
