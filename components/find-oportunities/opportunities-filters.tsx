"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin, Globe, Briefcase, Users, DollarSign, Percent } from "lucide-react"

export function OpportunityFilters() {
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [minCommission, setMinCommission] = useState("")

    const filterCategories = [
        {
            name: "Industria",
            icon: Briefcase,
            color: "from-purple-500 to-indigo-500",
            options: ["Technology", "Marketing", "Consumer Goods", "Home Services", "Healthcare"],
        },
        {
            name: "Audiencia",
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            options: ["B2B", "B2C", "Enterprise"],
        },
        {
            name: "Idioma",
            icon: Globe,
            color: "from-green-500 to-emerald-500",
            options: ["English", "Spanish", "French", "German"],
        },
        {
            name: "Ubicación",
            icon: MapPin,
            color: "from-orange-500 to-red-500",
            options: ["Spain", "Austria", "Europe", "Global", "North America"],
        },
    ]

    const handleClearFilters = () => {
        setMinPrice("")
        setMaxPrice("")
        setMinCommission("")
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Categorías de filtros */}
                {filterCategories.map((category) => (
                    <div key={category.name} className="space-y-3">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                                <category.icon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        </div>
                        <div className="space-y-3">
                            {category.options.map((option) => (
                                <div key={option} className="flex items-center space-x-3">
                                    <Checkbox
                                        id={`${category.name}-${option}`}
                                        className="border-2 border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                                    />
                                    <Label
                                        htmlFor={`${category.name}-${option}`}
                                        className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors font-medium"
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Rango de precio */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500">
                            <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Precio</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="min-price" className="text-sm font-medium text-gray-700 mb-2 block">
                                Mínimo
                            </Label>
                            <Input
                                id="min-price"
                                type="number"
                                placeholder="0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="border-2 border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 rounded-lg"
                            />
                        </div>
                        <div>
                            <Label htmlFor="max-price" className="text-sm font-medium text-gray-700 mb-2 block">
                                Máximo
                            </Label>
                            <Input
                                id="max-price"
                                type="number"
                                placeholder="150000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="border-2 border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Comisión */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500">
                            <Percent className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Comisión (%)</h3>
                    </div>
                    <div>
                        <Label htmlFor="min-commission" className="text-sm font-medium text-gray-700 mb-2 block">
                            Mínimo
                        </Label>
                        <Input
                            id="min-commission"
                            type="number"
                            placeholder="0"
                            value={minCommission}
                            onChange={(e) => setMinCommission(e.target.value)}
                            className="border-2 border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6"
                    onClick={handleClearFilters}
                >
                    Limpiar Filtros
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-6">Aplicar Filtros</Button>
            </div>
        </div>
    )
}
