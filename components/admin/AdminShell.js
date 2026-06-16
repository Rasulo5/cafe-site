"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import AdminBreadcrumbs from "./AdminBreadcrumbs";
import { ToastProvider } from "./Toast";

export default function AdminShell({ children, badges }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <Sidebar badges={badges} />
        <div className="md:pl-64">
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur">
            <div className="flex items-center justify-end gap-3 pl-12 md:pl-0">
              <span className="text-sm text-slate-400">Администратор</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 font-bold text-white">
                А
              </div>
            </div>
          </header>
          <main className="p-6">
            <AdminBreadcrumbs />
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
