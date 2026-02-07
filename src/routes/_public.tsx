import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <main className='min-h-dvh w-full bg-muted flex items-center justify-center-safe'>
      <Outlet />
    </main>
  );
}
