import { AppSidebar } from '@/components/app-sidebar';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_private')({
  beforeLoad: ({ context }) => {
    console.log(context);
  },
  component: PrivateLayout,
})

function PrivateLayout() {
  return (
    <div className="flex h-screen w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 flex flex-col h-full">
            <Header />
            <main className="flex-1 overflow-y-auto px-6 py-3 bg-muted">
              <Outlet />
            </main>
            <Footer />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
