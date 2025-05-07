import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ApplicantsFilterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ApplicantsFilter({ className, ...props }: ApplicantsFilterProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div>
        <h3 className="mb-4 text-lg font-medium">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search applicants..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="opportunity">Opportunity</Label>
            <Select>
              <SelectTrigger id="opportunity">
                <SelectValue placeholder="Select opportunity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Opportunities</SelectItem>
                <SelectItem value="enterprise-sales">Enterprise Sales Representative</SelectItem>
                <SelectItem value="sales-development">Sales Development Representative</SelectItem>
                <SelectItem value="regional-manager">Regional Sales Manager</SelectItem>
                <SelectItem value="inside-sales">Inside Sales Representative</SelectItem>
              </SelectContent>
            </Select>
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
          <div className="pt-4">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
