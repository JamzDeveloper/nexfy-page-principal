import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ApplicationsFilterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ApplicationsFilter({ className, ...props }: ApplicationsFilterProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div>
        <h3 className="mb-4 text-lg font-medium">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search applications..." />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending" className="font-normal">
                  Pending
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reviewing" id="reviewing" />
                <Label htmlFor="reviewing" className="font-normal">
                  Reviewing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accepted" id="accepted" />
                <Label htmlFor="accepted" className="font-normal">
                  Accepted
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="rejected" />
                <Label htmlFor="rejected" className="font-normal">
                  Rejected
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Date Applied</Label>
            <RadioGroup defaultValue="all-time">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all-time" id="all-time" />
                <Label htmlFor="all-time" className="font-normal">
                  All Time
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="this-month" id="this-month" />
                <Label htmlFor="this-month" className="font-normal">
                  This Month
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="last-month" id="last-month" />
                <Label htmlFor="last-month" className="font-normal">
                  Last Month
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="last-3-months" id="last-3-months" />
                <Label htmlFor="last-3-months" className="font-normal">
                  Last 3 Months
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="pt-4">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
