import { SidebarInset } from '@/components/ui/sidebar'
import { Header } from '@/components/nav/Header'
import { MDXProviderWrapper } from '@/components/slide-deck/MDXProvider'
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
      <MDXProviderWrapper>
        <CurrentSlideProvider>
          <ModeProvider>{children}</ModeProvider>
        </CurrentSlideProvider>
      </MDXProviderWrapper>
    </SidebarInset>
  )
}
