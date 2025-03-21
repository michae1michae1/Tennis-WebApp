import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tennis Tournament App',
  description: 'Create, manage, and participate in custom tennis tournaments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-primary text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>© {new Date().getFullYear()} Tennis Tournament App. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 