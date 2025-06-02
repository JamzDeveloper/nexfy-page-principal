import { OpportunitiesTable } from "@/components/opportunities/opportunities-table";
//import { useState } from "react";
import { Company } from "@/types/company";
import { fetchCompaniesFromAPI } from "@/lib/api/companies";
import { cookies } from "next/headers";
import { OpportunityFull } from "@/types/opportunity";
import { fetchOpportunityFormApi } from "@/lib/api/opportunity";

export default async function NewOpportunityPage() {
  try {
  const token = (await cookies()).get("session-token")?.value;

  if (!token) {
    throw new Error("No se encontró el token de sesión");
  }

      // Agregamos más información de debug
  console.log("Iniciando carga de datos...");
  console.log("Token presente:", !!token);

  const [companies, opportunities] = await Promise.all([
      fetchCompaniesFromAPI(token).catch(error => {
        console.error("Error al cargar compañías:", error);
        return [];
      }),
      fetchOpportunityFormApi(token).catch(error => {
        console.error("Error al cargar oportunidades:", error);
        return [];
      })
  ]);

  console.log("Companies loaded:", companies?.length || 0);
  console.log("Opportunities loaded:", opportunities?.length || 0);

    // // Si no hay compañías, mostramos un mensaje específico
    // if (!companies?.length) {
    //   return (
    //     <div className="space-y-8">
    //       <div className="p-4">
    //         <h2 className="text-3xl font-bold tracking-tight">Crear Oportunidad</h2>
    //         <p className="text-yellow-600 mt-4">
    //           No hay compañías disponibles. Necesitas crear una compañía primero.
    //         </p>
    //         {/* Aquí podrías agregar un botón para crear compañía */}
    //       </div>
    //     </div>
    //   );
    // }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Crear Oportunidad</h2>
        <p className="text-muted-foreground">
          Publica una nueva oportunidad de ventas para encontrar el agente perfecto
        </p>
      </div>
      <OpportunitiesTable 
        companies={companies ?? []} 
        token={token}  
        opportunities={opportunities}
        />
    </div>
  );
  
  } catch (error) {
      console.error("Error loading page:", error);
      return (
        <div className="p-4">
          <p className="text-red-500">
            Error al cargar los datos. Por favor, intenta de nuevo más tarde.
          </p>
        </div>
      );
  }
}


/*
export default async function OpportunitiesPage() {
  const token = (await cookies()).get("session-token")?.value;

  let companies: Company[] = await fetchCompaniesFromAPI(token!);
  let opportunities:OpportunityFull[] = await fetchOpportunityFormApi(token!);
  console.log(companies);

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <PageHeader
          title="Opportunities"
          description="Manage sales opportunities on the platform"
        />

        <OpportunitiesTable companies={companies ?? []} token={token!}  opportunities={opportunities}/>
      </div>
    </div>
  );
}
*/


/*
import { CompanyOpportunitiesList } from "@/components/opportunities/company-opportunities-list"

export default function CompanyOpportunitiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Oportunidades</h2>
        <p className="text-muted-foreground">Gestiona tus oportunidades de ventas</p>
      </div>

      <CompanyOpportunitiesList />
    </div>
  )
}
  */
