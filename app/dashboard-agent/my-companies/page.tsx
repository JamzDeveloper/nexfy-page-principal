import { CompaniesTable } from "@/components/companies/companies-table"
import { PendingContractsTable } from "@/components/companies/pending-contracts-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyCompaniesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mis Compañías</h2>
        <p className="text-muted-foreground">Gestiona tus relaciones con las compañías y contratos</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Contratos Activos</TabsTrigger>
          <TabsTrigger value="pending">Contratos Pendientes</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <CompaniesTable />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <PendingContractsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
