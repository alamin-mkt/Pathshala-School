import type { Metadata } from "next";
import "@/styles/globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata: Metadata = {
  title: "Pathshala | Learn. Grow. Shine. - Multi-Tenant School Management SaaS",
  description:
    "Production-grade, multi-tenant school management system. Manage academics, admissions, attendance, examinations, fee collection, staff and parent communication effortlessly.",
  icons: {
    icon: "/assets/Pathshala.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-gold-500/30 selection:text-navy-900">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
