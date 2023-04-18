import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '@/components/ui/Button'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
      <Button>Click</Button>
    </main>
  )
}
