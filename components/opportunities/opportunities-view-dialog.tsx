"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FileText } from "lucide-react"
import { OpportunityFull } from "@/types/opportunity"

// type Opportunity = {
//   id: string
//   title: string
//   company: string
//   targetIndustry: string
//   commission: string
//   // status: "active" | "closed" | "draft"
//   applications: number
//   createdAt: string
//   description?: string
//   requirements?: string
// }

interface OpportunityViewDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    opportunity: OpportunityFull | null
    onEdit: (opportunity: OpportunityFull) => void
}

export function OpportunityViewDialog({ open, onOpenChange, opportunity, onEdit }: OpportunityViewDialogProps) {
    if (!opportunity) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
                <div className="flex flex-col h-full relative">
                    <DialogHeader className="sticky top-0 z-50 bg-background p-4 border-b">
                        <DialogTitle>{opportunity.title}</DialogTitle>
                        <DialogDescription>
                            {opportunity.company?.companyName} • {opportunity.targetIndustry}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-4 py-4">
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {/* <Badge
                  variant={
                    opportunity.status === "active"
                      ? "default"
                      : opportunity.status === "closed"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {opportunity.status}
                </Badge> */}
                                <Badge variant="outline">{opportunity.commissionPercentage} Commission</Badge>
                                <Badge variant="outline">{opportunity.applicationsCount} Applications</Badge>
                            </div>

                            {/* Basic Information */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Basic Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">Company:</span>
                                            <p className="text-sm text-muted-foreground">{opportunity.company?.companyName}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">Title:</span>
                                            <p className="text-sm text-muted-foreground">{opportunity.title}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">Category:</span>
                                            <p className="text-sm text-muted-foreground">{opportunity.targetIndustry}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">Commission Rate:</span>
                                            <p className="text-sm text-muted-foreground">{opportunity.commissionPercentage}</p>
                                        </div>
                                        {/* <div>
                      <span className="text-sm font-medium">Status:</span>
                      <p className="text-sm text-muted-foreground capitalize">{opportunity.status}</p>
                    </div> */}
                                        <div>
                                            <span className="text-sm font-medium">Applications:</span>
                                            <p className="text-sm text-muted-foreground">{opportunity.applicationsCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Description */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Content Description</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{opportunity.contentDescription}</p>
                            </div>

                            {/* Target Information */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Target Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">Target Industry:</span>
                                            <p className="text-sm text-muted-foreground">{opportunity.targetIndustry}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">Target Audience:</span>
                                            <p className="text-sm text-muted-foreground">Enterprise clients, Fortune 500 companies</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">Country:</span>
                                            <p className="text-sm text-muted-foreground">United States</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">City:</span>
                                            <p className="text-sm text-muted-foreground">New York, Los Angeles, Chicago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                        English
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        Spanish
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        French
                                    </Badge>
                                </div>
                            </div>

                            {/* Financial Information */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Financial Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <span className="text-sm font-medium">Currency:</span>
                                        <p className="text-sm text-muted-foreground">USD</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">Average Deal Value:</span>
                                        <p className="text-sm text-muted-foreground">$50,000</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">Commission Percentage:</span>
                                        <p className="text-sm text-muted-foreground">{opportunity.commissionPercentage}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className="text-sm font-medium">Pricing Structure Notes:</span>
                                    <p className="text-sm text-muted-foreground mt-1">{opportunity.pricingStructureNotes}</p>
                                </div>
                            </div>

                            {/* Sales Information */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Sales Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <span className="text-sm font-medium">Sales Cycle Estimation:</span>
                                        <p className="text-sm text-muted-foreground">3-6 months</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">Deliver Leads:</span>
                                        <p className="text-sm text-muted-foreground">Yes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Q&A Section */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Q&A Section</h4>
                                <div className="space-y-3">
                                    <div className="border rounded-lg p-4">
                                        <h5 className="text-sm font-medium mb-2">What is the typical sales cycle?</h5>
                                        <p className="text-sm text-muted-foreground">
                                            The average sales cycle ranges from 3-6 months depending on the client size and complexity of the
                                            solution.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h5 className="text-sm font-medium mb-2">Do you provide marketing materials?</h5>
                                        <p className="text-sm text-muted-foreground">
                                            Yes, we provide comprehensive marketing materials including brochures, case studies, and demo
                                            videos.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h5 className="text-sm font-medium mb-2">What support do you offer to sales agents?</h5>
                                        <p className="text-sm text-muted-foreground">
                                            We provide 24/7 technical support, regular training sessions, and dedicated account managers for
                                            all our sales partners.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Video Links */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Training Videos</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <div className="h-6 w-6 bg-red-500 rounded-sm flex items-center justify-center">
                                            <span className="text-white text-xs">▶</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Product Demo Training</p>
                                            <p className="text-xs text-muted-foreground">https://youtube.com/watch?v=demo1</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <div className="h-6 w-6 bg-red-500 rounded-sm flex items-center justify-center">
                                            <span className="text-white text-xs">▶</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Sales Techniques Masterclass</p>
                                            <p className="text-xs text-muted-foreground">https://youtube.com/watch?v=sales101</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <div className="h-6 w-6 bg-red-500 rounded-sm flex items-center justify-center">
                                            <span className="text-white text-xs">▶</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Customer Success Stories</p>
                                            <p className="text-xs text-muted-foreground">https://vimeo.com/success-stories</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Documents</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <FileText className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium">Product Brochure.pdf</p>
                                            <p className="text-xs text-muted-foreground">2.4 MB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                                        <FileText className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium">Sales Playbook.docx</p>
                                            <p className="text-xs text-muted-foreground">1.8 MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Images */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">Images</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="relative group">
                                        <div className="aspect-video rounded-lg overflow-hidden border">
                                            <img
                                                src="/placeholder.svg?height=200&width=300&query=product dashboard interface"
                                                alt="Product Dashboard"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Product Dashboard Interface</p>
                                    </div>
                                    <div className="relative group">
                                        <div className="aspect-video rounded-lg overflow-hidden border">
                                            <img
                                                src="/placeholder.svg?height=200&width=300&query=sales team meeting"
                                                alt="Sales Team"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Sales Team Training</p>
                                    </div>
                                    <div className="relative group">
                                        <div className="aspect-video rounded-lg overflow-hidden border">
                                            <img
                                                src="/placeholder.svg?height=200&width=300&query=customer success chart"
                                                alt="Success Metrics"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Customer Success Metrics</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-muted-foreground pt-4 border-t">
                                <span>ID: {opportunity.id}</span>
                                <span>Created: {opportunity.createdAt}</span>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="sticky bottom-0 bg-background z-50 mt-auto border-t p-4">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                onOpenChange(false)
                                onEdit(opportunity)
                            }}
                        >
                            Edit Opportunity
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}