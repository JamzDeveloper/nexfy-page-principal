import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connect Sales Agents with Companies
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                NexfyApp is the platform where sales agents find opportunities and companies discover top talent to
                drive revenue growth.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/register?role=agent">
                <Button size="lg" className="w-full">
                  I'm a Sales Agent
                </Button>
              </Link>
              <Link href="/auth/register?role=company">
                <Button size="lg" variant="outline" className="w-full">
                  I'm a Company
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?key=i58e8"
              width={550}
              height={450}
              alt="Sales agents and companies connecting"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
