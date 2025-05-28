"use client"

import type { Metadata } from "next";
//import { PageHeader } from "@/components/page-header";
import { OpportunitiesTable } from "@/components/opportunities/opportunities-table";
//import { useState } from "react";
//import { Company } from "@/types/company";
//import { fetchCompaniesFromAPI } from "@/lib/api/companies";
import { cookies } from "next/headers";
/*
export const metadata: Metadata = {
  title: "Oportunidades | NexfyApp",
};
*/

export default function NewOpportunityPage() {
  
  //const token = (await cookies()).get("session-token")?.value;
  //let companies: Company[] = await fetchCompaniesFromAPI(token!);
  //console.log(companies);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Crear Oportunidad</h2>
        <p className="text-muted-foreground">
          Publica una nueva oportunidad de ventas para encontrar el agente perfecto
        </p>
      </div>
      <OpportunitiesTable />
    </div>
  )
}
