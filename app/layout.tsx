import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '@/helpers/constants'
import AppProviders from '@/components/providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <body>
          <AppProviders>
            <div
              className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen antialiased`}
              style={{
                gridTemplateRows: `${HEADER_HEIGHT} 1fr ${FOOTER_HEIGHT}`,
              }}
            >
              <div
                className={`bg-orange-500`}
                style={{ height: `${HEADER_HEIGHT}` }}
              >
                <div className="mx-auto w-full max-w-7xl">headers go here</div>
              </div>
              <div className={`mx-auto w-full max-w-7xl`}>{children}</div>
              <div
                className="bg-orange-500"
                style={{ height: `${FOOTER_HEIGHT}` }}
              >
                <div className="mx-auto w-full max-w-7xl">footers go here</div>
              </div>
            </div>
          </AppProviders>
        </body>
      </body>
    </html>
  )
}
