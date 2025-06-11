"use client"

import { useState } from "react"
import { OpportunityCard } from "./opportunities-card"
import { OpportunityFilters } from "./opportunities-filters"
import { Input } from "@/components/ui/input"
import { Search, Filter, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos de ejemplo
const mockOpportunities = [
    {
        opportunityId: "1",
        title: "Sales Representative - Consumer Goods",
        company: "Consumer Brands Inc",
        description:
            "Drive sales growth in the consumer goods sector with competitive commission structure and flexible working arrangements.",
        industry: "Consumer Goods",
        targetAudience: "B2C",
        location: "Spain - Barcelona",
        language: "Spanish",
        minimumPrice: 1000,
        commissionPercentage: 10,
        status: "active" as const,
        publishedAt: "2 days ago",
    },
    {
        opportunityId: "2",
        title: "Digital Marketing Services",
        company: "TechAI Solutions",
        description:
            "Revolutionary opportunity to sell cutting-edge AI solutions to businesses looking to transform their operations.",
        industry: "Technology",
        targetAudience: "B2B",
        location: "Europe",
        language: "Spanish",
        minimumPrice: 1000,
        commissionPercentage: 20,
        status: "active" as const,
        publishedAt: "1 week ago",
    },
    {
        opportunityId: "3",
        title: "Home Services Sales Representative",
        company: "HomeServe Pro",
        description: "Connect homeowners with quality painting, cleaning, and maintenance services in your local area.",
        industry: "Home Services",
        targetAudience: "B2C",
        location: "Spain - Barcelona",
        language: "Spanish",
        minimumPrice: 1500,
        commissionPercentage: 15,
        status: "active" as const,
        publishedAt: "3 days ago",
    },
    {
        opportunityId: "4",
        title: "AI Solutions Sales Agent",
        company: "MarketEdge",
        description:
            "Help businesses grow their online presence through strategic digital marketing solutions and campaigns.",
        industry: "Marketing",
        targetAudience: "B2B",
        location: "Europe - Remote",
        language: "English",
        minimumPrice: 2500,
        commissionPercentage: 25,
        status: "active" as const,
        publishedAt: "Just now",
    },
    {
        opportunityId: "5",
        title: "Software Development Sales",
        company: "CodeCraft Solutions",
        description:
            "Sell custom software solutions to enterprises looking to digitize and optimize their business processes.",
        industry: "Technology",
        targetAudience: "B2B",
        location: "Global - Remote",
        language: "English",
        minimumPrice: 5000,
        commissionPercentage: 12,
        status: "active" as const,
        publishedAt: "5 days ago",
    },
]

export function OpportunitiesInterface() {
    const [searchQuery, setSearchQuery] = useState("")
    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            {/* Search and Filters con diseño mejorado */}
            <div className="mb-10">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Buscar por título, empresa o ubicación..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 h-14 border-0 bg-gray-50 rounded-xl text-lg focus:bg-white focus:ring-2 focus:ring-gray-900 transition-all"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="h-14 px-6 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 rounded-xl transition-all"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="w-5 h-5 mr-2" />
                            Filtros
                        </Button>
                    </div>

                    {/* Filtros expandibles */}
                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <OpportunityFilters />
                        </div>
                    )}
                </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Oportunidades Disponibles</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-600 font-medium">{mockOpportunities.length} oportunidades activas</span>
                </div>
            </div>

            {/* Opportunities List - Una sola columna */}
            <div className="space-y-4">
                {mockOpportunities.map((opportunity, index) => (
                    <div
                        key={opportunity.opportunityId}
                        className="animate-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <OpportunityCard opportunity={opportunity} />
                    </div>
                ))}
            </div>
        </div>
    )
}
