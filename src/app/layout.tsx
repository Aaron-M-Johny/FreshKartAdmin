import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: 'Groskart Admin',
  description: 'Manage Groskart',
  icons: {
    icon: [
      { url: '/icons/icon-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/icons/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteHeader  />

              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

