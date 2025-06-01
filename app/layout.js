import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptopia',
  description: 'An AI powered prompt posting app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-bl from-white to-pink-100 min-h-screen`}>
        <Providers>
        <Nav/>
        {children}
        </Providers>
      </body>
    </html>
  )
}
