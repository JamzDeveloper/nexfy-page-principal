import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to Transform Your Sales Experience?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of successful agents and companies on NexfyApp today
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
      </div>
    </section>
  )
}
