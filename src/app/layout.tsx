import MocksProvider from '@/app/provider'
import type { Metadata } from 'next'

// destyle
import 'destyle.css/destyle.min.css'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
}

// styles
import { Noto_Sans_JP } from 'next/font/google'
const fonts = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})
import { body, main } from './layout.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={body}>
        {/* msw 有効化 */}
        <MocksProvider />
        <main className={`${fonts.className} ${main}`}>{children}</main>
      </body>
    </html>
  )
}
