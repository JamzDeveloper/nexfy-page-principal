import { BarChart3, Building, MessageSquare, Search, ShieldCheck, UserCheck } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Search className="h-10 w-10" />,
      title: "Opportunity Marketplace",
      description: "Browse and filter through hundreds of sales opportunities that match your skills and interests.",
    },
    {
      icon: <Building className="h-10 w-10" />,
      title: "Company Profiles",
      description: "Create detailed company profiles to attract the best sales talent for your specific needs.",
    },
    {
      icon: <UserCheck className="h-10 w-10" />,
      title: "Agent Matching",
      description: "Our intelligent matching system connects companies with the most suitable sales agents.",
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "Integrated Chat",
      description: "Communicate directly with your matched partners through our secure messaging system.",
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Performance Tracking",
      description: "Monitor sales progress, commissions, and performance metrics in real-time dashboards.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Secure Payments",
      description: "Manage commissions and payments securely through our integrated payment system.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Features That Drive Success</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to connect, collaborate, and grow your sales network
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="text-primary">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
