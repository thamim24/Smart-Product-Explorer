import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Product Explorer',
  description: 'Discover products instantly with real-time search, dynamic filters, and intelligent recommendations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  )
}