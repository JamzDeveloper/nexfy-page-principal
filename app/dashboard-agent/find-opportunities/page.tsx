import { OpportunitiesList } from "@/components/opportunities/opportunities-list"
import { OpportunitiesFilter } from "@/components/opportunities/opportunities-filter"

import { OpportunitiesInterface } from "@/components/find-oportunities/opportunities-interface"
import { Sparkles } from "lucide-react"

export default function FindOpportunitiesPage() {
  return (
    // <div className="space-y-8 px-auto max-w-7xl py-8">
    //   {/* <div>
    //     <h2 className="text-3xl font-bold tracking-tight">Buscar Oportunidades</h2>
    //     <p className="text-muted-foreground">
    //       Explora y aplica a oportunidades de ventas que coincidan con tus habilidades
    //     </p>
    //   </div> */}

    // <div className="text-left mb-12">

    //   <div className="inline-flex gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-4 ">
    //     <Sparkles className="w-4 h-4 text-gray-600" />
    //     <span className="text-sm font-medium text-gray-800">Encuentra tu próxima oportunidad</span>
    //   </div>

    //     <h1 className="text-4xl font-bold text-gray-900 mb-4">Oportunidades de Ventas </h1>
    //     <p className="text-lg text-left text-gray-600 max-w-2xl">
    //       Descubre oportunidades únicas que se adapten a tus habilidades y objetivos profesionales
    //     </p>
    // </div>


    //   <div className="flex flex-col gap-6 md:flex-row">
    //     {/* <OpportunitiesList className="flex-1" /> */}
    //     <OpportunitiesInterface />
    //   </div>

    // </div>

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-2">
          <div className="inline-flex gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Encuentra tu próxima oportunidad</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Oportunidades de Ventas</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Descubre oportunidades únicas que se adapten a tus habilidades y objetivos profesionales
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full">
          <OpportunitiesInterface />
        </div>
      </div>
    </div>
  )
}
