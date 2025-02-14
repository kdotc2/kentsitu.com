import { SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/nav/AppSidebar'
import { Header } from '@/components/nav/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="relative overflow-y-auto overflow-x-hidden">
          <div className="mx-auto max-w-5xl px-5 md:px-10 md:supports-[height:100dvh]:h-[calc(100dvh-64px)]">
            {children}
          </div>
        </div>
      </SidebarInset>
    </>
  )
}
