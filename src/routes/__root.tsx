import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background bg-mesh px-4">
      <div className="max-w-md text-center glass rounded-3xl p-10">
        <h1 className="text-8xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page drifted off into the gradient.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center glass rounded-3xl p-10">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something broke
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full px-5 py-2 text-sm font-medium text-white"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2 text-sm font-medium">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Israt — Frontend Developer & UI/UX Designer" },
      { name: "description", content: "Portfolio of Israt — a frontend developer crafting premium, animated, responsive web experiences with React, Node.js and modern UI design." },
      { name: "author", content: "Israt" },
      { property: "og:title", content: "Israt — Frontend Developer & UI/UX Designer" },
      { property: "og:description", content: "Portfolio of Israt — a frontend developer crafting premium, animated, responsive web experiences with React, Node.js and modern UI design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Israt — Frontend Developer & UI/UX Designer" },
      { name: "twitter:description", content: "Portfolio of Israt — a frontend developer crafting premium, animated, responsive web experiences with React, Node.js and modern UI design." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0b7be939-255d-4b91-b32c-48cc7bc507f2/id-preview-d367a4c1--f35f1324-96b6-4650-866e-112bb0ca38da.lovable.app-1783272463100.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0b7be939-255d-4b91-b32c-48cc7bc507f2/id-preview-d367a4c1--f35f1324-96b6-4650-866e-112bb0ca38da.lovable.app-1783272463100.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
