"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const opportunityFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  type: z.string({
    required_error: "Please select an opportunity type.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  remote: z.boolean().default(false),
  min_salary: z.number().min(10000, {
    message: "Minimum salary must be at least $10,000.",
  }),
  max_salary: z.number().min(10000, {
    message: "Maximum salary must be at least $10,000.",
  }),
  requirements: z.string().min(20, {
    message: "Requirements must be at least 20 characters.",
  }),
  benefits: z.string().min(20, {
    message: "Benefits must be at least 20 characters.",
  }),
})

type OpportunityFormValues = z.infer<typeof opportunityFormSchema>

export function OpportunityForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunityFormSchema),
    defaultValues: {
      title: "",
      description: "",
      industry: "",
      type: "",
      location: "",
      remote: false,
      min_salary: 50000,
      max_salary: 100000,
      requirements: "",
      benefits: "",
    },
  })

  function onSubmit(data: OpportunityFormValues) {
    toast({
      title: "Opportunity created",
      description: "Your opportunity has been created successfully.",
    })
    router.push("/dashboard/opportunities")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunity Details</CardTitle>
        <CardDescription>Fill out the form below to create a new sales opportunity.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div> aqui se ingresarán los datos para la crear la oportunidad</div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Create Opportunity</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
