import { SidebarInset } from '@/components/ui/sidebar'
import { Header } from '@/components/nav/Header'
import { CurrentSlideProvider } from '@/context/CurrentSlideContext'
import { ModeProvider } from '@/context/ModeContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarInset>
      <Header />
      <CurrentSlideProvider>
        <ModeProvider>{children}</ModeProvider>
      </CurrentSlideProvider>
    </SidebarInset>
  )
}
