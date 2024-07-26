"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {CircleUser, Menu, Package2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {SidebarNav} from "../ui/sidebar-nav";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const links = [{name: "Projects", href: "/dashboard/projects"}];

  let sidebarNavItems: {title: string; href: string}[] = [];

  if (pathname.includes("/project")) {
    sidebarNavItems = [
      {
        title: "Projects",
        href: "/project",
      },
      {
        title: "Create",
        href: "/project/create",
      },
    ];
  }

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6 z-10'>
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Link href='#' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
            <Package2 className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          {links.map(({name, href}) => (
            <Link
              key={name}
              href={href}
              className={cn(
                "transition-colors hover:text-foreground",
                pathname === href ? "text-foreground" : "text-muted-foreground"
              )}>
              {name}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link href='#' className='flex items-center gap-2 text-lg font-semibold'>
                <Package2 className='h-6 w-6' />
                <span className='sr-only'>Acme Inc</span>
              </Link>
              <Link href='#' className='text-muted-foreground hover:text-foreground'>
                Dashboard
              </Link>
              <Link href='#' className='text-muted-foreground hover:text-foreground'>
                Orders
              </Link>
              <Link href='#' className='text-muted-foreground hover:text-foreground'>
                Products
              </Link>
              <Link href='#' className='text-muted-foreground hover:text-foreground'>
                Customers
              </Link>
              <Link href='#' className='hover:text-foreground'>
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
          <div className='ml-auto flex-1 sm:flex-initial'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className='flex flex-col flex-1 space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
          <p className='text-muted-foreground'>Manage your account settings and set e-mail preferences.</p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-1 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <main className='flex-1'>{children}</main>
        </div>
      </div>
    </div>
  );
}
