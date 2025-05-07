"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface OpportunitiesFilterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function OpportunitiesFilter({ className, ...props }: OpportunitiesFilterProps) {
  const [minSalary, setMinSalary] = useState(50000)

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div>
        <h3 className="mb-4 text-lg font-medium">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search opportunities..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Opportunity Type</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Minimum Salary: ${minSalary.toLocaleString()}</Label>
            <Slider defaultValue={[50000]} max={200000} step={5000} onValueChange={(value) => setMinSalary(value[0])} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="remote" />
            <Label htmlFor="remote">Remote Only</Label>
          </div>
          <div className="pt-4">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
