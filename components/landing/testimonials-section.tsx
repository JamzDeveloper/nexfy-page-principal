import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "NexfyApp transformed my sales career. I've connected with amazing companies and increased my income by 40% in just six months.",
      author: "Sarah Johnson",
      role: "Independent Sales Agent",
      avatar: "/professional-woman-headshot.png",
    },
    {
      quote:
        "Finding qualified sales agents used to be our biggest challenge. With NexfyApp, we've built a network of top performers who consistently exceed targets.",
      author: "Michael Chen",
      role: "Sales Director, TechGrowth Inc.",
      avatar: "/asian-businessman-confident.png",
    },
    {
      quote:
        "The platform's ease of use and powerful features have made scaling our sales team effortless. Our revenue has grown 65% year-over-year.",
      author: "Emma Rodriguez",
      role: "CEO, Innovate Solutions",
      avatar: "/latina-executive-woman.png",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="testimonials">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Success Stories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from the agents and companies who've achieved remarkable results with NexfyApp
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-muted-foreground">"{testimonial.quote}"</p>
              <div className="text-center">
                <h3 className="font-bold">{testimonial.author}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
