import { OpportunityForm } from "@/components/opportunities/opportunity-form"

export default function NewOpportunityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Crear Oportunidad</h2>
        <p className="text-muted-foreground">
          Publica una nueva oportunidad de ventas para encontrar el agente perfecto
        </p>
      </div>
      <OpportunityForm />
    </div>
  )
}
