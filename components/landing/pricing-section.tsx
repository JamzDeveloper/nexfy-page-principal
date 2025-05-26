import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  const plans = [
    {
      name: "For Agents",
      price: "Free",
      description: "Everything you need to start your sales journey",
      features: [
        "Create professional profile",
        "Browse unlimited opportunities",
        "Apply to 10 opportunities per month",
        "Basic performance tracking",
        "Secure messaging with companies",
      ],
      cta: "Sign Up as Agent",
      href: "/auth/register?role=agent",
      popular: false,
    },
    {
      name: "For Companies",
      price: "$99",
      period: "/month",
      description: "Powerful tools to find and manage sales talent",
      features: [
        "Detailed company profile",
        "Post unlimited opportunities",
        "Advanced agent filtering",
        "Performance analytics dashboard",
        "Integrated payment processing",
        "Priority support",
      ],
      cta: "Sign Up as Company",
      href: "/auth/register?role=company",
      popular: true,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for your role
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg border p-6 shadow-sm ${plan.popular ? "border-primary" : ""}`}
            >
              {plan.popular && (
                <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground mb-4 self-start">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                {plan.price}
                {plan.period && <span className="ml-1 text-sm font-normal text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="mt-2 text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href={plan.href}>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
