import type { ReactNode } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import Link from 'next/link';
import { Home, History, Warehouse, Settings, ClipboardList } from 'lucide-react';
import { ScanDialog } from "@/components/scan-dialog";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex h-14 items-center justify-center border-b p-2">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <Warehouse className="h-6 w-6 text-primary" />
                    <span className="group-data-[collapsible=icon]:hidden">Onde Está</span>
                </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Painel">
                  <Link href="/dashboard">
                    <Home />
                    <span>Painel</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="Registro">
                    <Link href="/dashboard/registro">
                        <ClipboardList />
                        <span>Registro</span>
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="Histórico de Movimentação">
                    <Link href="/dashboard/history">
                        <History />
                        <span>Histórico</span>
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Configurações">
                  <Link href="#">
                    <Settings />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
            </div>
            <ScanDialog />
            <UserNav />
          </header>
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
