import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-secondary-foreground sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            nativeButton={false}
            render={
              <Link to="/">
                <Home />
                Go back home
              </Link>
            }
          />
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <Link to="/">
                Contact support
              </Link>
            }
          />
        </div>
      </div>
    </main>
  );
}