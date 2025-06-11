//// filepath: c:\Users\Alexc\Desktop\nexfy\nexfy-app\components\opportunities\opportunities-view-dialog.tsx
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

interface OpportunityViewDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    opportunity: OpportunityFull | null
    onEdit: (opportunity: OpportunityFull) => void
}

export function OpportunityViewDialog({
    open,
    onOpenChange,
    opportunity,
    onEdit,
}: OpportunityViewDialogProps) {
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
                            {/* Mostrar estado o badges */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">
                                    {opportunity.commissionPercentage || 0}% Commission
                                </Badge>
                                <Badge variant="outline">
                                    {opportunity.applicationsCount || 0} Applications
                                </Badge>
                            </div>

                            {/* Basic Information */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Basic Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">Company:</span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.company?.companyName}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">Title:</span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.title}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">Category:</span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.targetIndustry}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">
                                                Commission Rate:
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.commissionPercentage || 0}%
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">Applications:</span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.applicationsCount || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Description */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Content Description
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {opportunity.contentDescription || "N/A"}
                                </p>
                            </div>

                            {/* Target Information */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Target Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">
                                                Target Industry:
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.targetIndustry || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">
                                                Target Audience:
                                            </span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.targetAudience || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium">Country:</span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.country || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium">City:</span>
                                            <p className="text-sm text-muted-foreground">
                                                {opportunity.city || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Languages
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.languages && opportunity.languages.length > 0 ? (
                                        opportunity.languages.map((lang, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {lang}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No languages
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Financial Information */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Financial Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <span className="text-sm font-medium">Currency:</span>
                                        <p className="text-sm text-muted-foreground">
                                            {opportunity.currency || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">
                                            Average Deal Value:
                                        </span>
                                        <p className="text-sm text-muted-foreground">
                                            {opportunity.averageDealValue
                                                ? `$${opportunity.averageDealValue}`
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">
                                            Commission Percentage:
                                        </span>
                                        <p className="text-sm text-muted-foreground">
                                            {opportunity.commissionPercentage || 0}%
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className="text-sm font-medium">
                                        Pricing Structure Notes:
                                    </span>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {opportunity.pricingStructureNotes || "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Sales Information */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Sales Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <span className="text-sm font-medium">
                                            Sales Cycle Estimation:
                                        </span>
                                        <p className="text-sm text-muted-foreground">
                                            {opportunity.salesCycleEstimation || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">Deliver Leads:</span>
                                        <p className="text-sm text-muted-foreground">
                                            {opportunity.deliverLeads ? "Yes" : "No"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Q&A Section */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Q&A Section
                                </h4>
                                {opportunity.qa && opportunity.qa.length > 0 ? (
                                    <div className="space-y-3">
                                        {opportunity.qa.map((item, idx) => (
                                            <div key={idx} className="border rounded-lg p-4">
                                                <h5 className="text-sm font-medium mb-2">
                                                    {item.question}
                                                </h5>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No Q&A items found.
                                    </p>
                                )}
                            </div>

                            {/* Video Links */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Training Videos
                                </h4>
                                {opportunity.videoLinks && opportunity.videoLinks.length > 0 ? (
                                    <div className="space-y-2">
                                        {opportunity.videoLinks.map((link, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 p-3 border rounded-lg"
                                            >
                                                <div className="h-6 w-6 bg-red-500 rounded-sm flex items-center justify-center">
                                                    <span className="text-white text-xs">▶</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Video #{idx + 1}</p>
                                                    <p className="text-xs text-muted-foreground">{link}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No videos</p>
                                )}
                            </div>

                            {/* Documents */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Documents
                                </h4>
                                {opportunity.assets?.filter((a) => a.type === "document")
                                    .length ? (
                                    opportunity.assets
                                        ?.filter((a) => a.type === "document")
                                        .map((doc) => (
                                            <div
                                                className="flex items-center gap-3 p-3 border rounded-lg mb-2"
                                                key={doc.id}
                                            >
                                                <FileText className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {doc.originalFilename || "Documento"}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {doc.description || doc.s3Key}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No documents
                                    </p>
                                )}
                            </div>

                            {/* Images */}
                            <div>
                                <h4 className="text-lg font-semibold border-b pb-2 mb-4">
                                    Images
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {opportunity.assets?.filter((a) => a.type === "image").length ? (
                                        opportunity.assets
                                            .filter((a) => a.type === "image")
                                            .map((img) => (
                                                <div className="relative group" key={img.id}>
                                                    <div className="aspect-video rounded-lg overflow-hidden border">
                                                        <img
                                                            src={img.url}
                                                            alt={img.description || "Image"}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        {img.description || "Image"}
                                                    </p>
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No images</p>
                                    )}
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