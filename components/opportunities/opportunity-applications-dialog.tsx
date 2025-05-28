"use client"

import * as React from "react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    MoreHorizontal,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Mail,
    Phone,
    MapPin,
    Star,
    Download,
    MessageSquare,
} from "lucide-react"
import { OpportunityFull } from "@/types/opportunity"

type Application = {
    id: string
    applicantName: string
    email: string
    phone: string
    location: string
    experience: string
    status: "pending" | "approved" | "rejected" | "interview"
    appliedAt: string
    // rating: number
    coverLetter: string
    resume?: string
    avatar?: string
}

// type Opportunity = {
//   id: string
//   title: string
//   company: string
//   category: string
//   commission: string
//   // status: "active" | "closed" | "draft"
//   applications: number
//   createdAt: string
//   description?: string
//   requirements?: string
// }

interface OpportunityApplicationsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    opportunity: OpportunityFull | null
}

// Sample applications data
const sampleApplications: Application[] = [
    {
        id: "APP-001",
        applicantName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        experience: "5 years in B2B software sales",
        status: "approved",
        appliedAt: "2023-12-15",
        // rating: 4.8,
        coverLetter:
            "I am excited to apply for this opportunity. With over 5 years of experience in B2B software sales, I have consistently exceeded my targets and built strong relationships with enterprise clients. My expertise in cloud solutions and proven track record make me an ideal candidate for this role.",
        resume: "sarah_johnson_resume.pdf",
        avatar: "/placeholder.svg?height=40&width=40&query=professional woman",
    },
    {
        id: "APP-002",
        applicantName: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 987-6543",
        location: "San Francisco, CA",
        experience: "3 years in tech sales",
        status: "pending",
        appliedAt: "2023-12-14",
        // rating: 4.2,
        coverLetter:
            "As a tech sales professional with 3 years of experience, I am passionate about helping businesses leverage technology to achieve their goals. I have a strong background in SaaS solutions and excellent communication skills.",
        resume: "michael_chen_resume.pdf",
        avatar: "/placeholder.svg?height=40&width=40&query=professional man asian",
    },
    {
        id: "APP-003",
        applicantName: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        phone: "+1 (555) 456-7890",
        location: "Austin, TX",
        experience: "7 years in enterprise sales",
        status: "interview",
        appliedAt: "2023-12-13",
        // rating: 4.9,
        coverLetter:
            "With 7 years of enterprise sales experience and a proven track record of closing million-dollar deals, I am confident I can drive significant results for your organization. My expertise in consultative selling and relationship building sets me apart.",
        resume: "emily_rodriguez_resume.pdf",
        avatar: "/placeholder.svg?height=40&width=40&query=professional woman latina",
    },
    {
        id: "APP-004",
        applicantName: "David Thompson",
        email: "david.thompson@email.com",
        phone: "+1 (555) 321-0987",
        location: "Chicago, IL",
        experience: "2 years in sales",
        status: "rejected",
        appliedAt: "2023-12-12",
        // rating: 3.5,
        coverLetter:
            "I am a motivated sales professional looking to grow my career in enterprise software sales. While I have 2 years of experience, I am eager to learn and contribute to your team's success.",
        resume: "david_thompson_resume.pdf",
        avatar: "/placeholder.svg?height=40&width=40&query=professional man",
    },
    {
        id: "APP-005",
        applicantName: "Lisa Wang",
        email: "lisa.wang@email.com",
        phone: "+1 (555) 654-3210",
        location: "Seattle, WA",
        experience: "4 years in cloud solutions",
        status: "pending",
        appliedAt: "2023-12-11",
        // rating: 4.6,
        coverLetter:
            "As a cloud solutions specialist with 4 years of experience, I have helped numerous organizations migrate to cloud platforms and optimize their operations. My technical background combined with sales skills makes me uniquely qualified.",
        resume: "lisa_wang_resume.pdf",
        avatar: "/placeholder.svg?height=40&width=40&query=professional woman asian",
    },
    {
        id: "APP-006",
        applicantName: "Robert Martinez",
        email: "robert.martinez@email.com",
        phone: "+1 (555) 789-0123",
        location: "Miami, FL",
        experience: "6 years in healthcare sales",
        status: "pending",
        appliedAt: "2023-12-10",
        // rating: 4.3,
        coverLetter:
            "With 6 years of healthcare sales experience, I understand the unique challenges and opportunities in this sector. I have successfully sold complex solutions to hospitals and healthcare systems.",
        resume: "robert_martinez_resume.pdf",
        avatar: "/placeholder.svg?height=40&width=40&query=professional man latino",
    },
    {
        id: "APP-007",
        applicantName: "Jennifer Kim",
        email: "jennifer.kim@email.com",
        phone: "+1 (555) 012-3456",
        location: "Boston, MA",
        experience: "8 years in enterprise software",
        status: "approved",
        appliedAt: "2023-12-09",
        // rating: 4.7,
        coverLetter:
            "As a senior enterprise software sales professional with 8 years of experience, I have consistently delivered exceptional results. My deep understanding of enterprise needs and solution-oriented approach drives success.",
        resume: "jennifer_kim_resume.pdf",
        avatar: "/placeholder.svg?height=40&width=40&query=professional woman korean",
    },
    {
        id: "APP-008",
        applicantName: "Alex Johnson",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 345-6789",
        location: "Denver, CO",
        experience: "1 year in sales",
        status: "interview",
        appliedAt: "2023-12-08",
        // rating: 3.8,
        coverLetter:
            "Although I am early in my sales career with 1 year of experience, I am highly motivated and eager to learn. I have shown strong potential and am committed to exceeding expectations.",
        resume: "alex_johnson_resume.pdf",
        avatar: "/placeholder.svg?height=40&width=40&query=young professional",
    },
]

export function OpportunityApplicationsDialog({ open, onOpenChange, opportunity }: OpportunityApplicationsDialogProps) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("all")
    const [selectedApplication, setSelectedApplication] = React.useState<Application | null>(null)
    const [isViewingApplication, setIsViewingApplication] = React.useState(false)

    if (!opportunity) return null

    // Filter applications based on search and status
    const filteredApplications = sampleApplications.filter((app) => {
        const matchesSearch =
            app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.location.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || app.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Get status counts
    const statusCounts = {
        all: sampleApplications.length,
        pending: sampleApplications.filter((app) => app.status === "pending").length,
        approved: sampleApplications.filter((app) => app.status === "approved").length,
        rejected: sampleApplications.filter((app) => app.status === "rejected").length,
        interview: sampleApplications.filter((app) => app.status === "interview").length,
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
            case "rejected":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
            case "interview":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Interview</Badge>
            case "pending":
            default:
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
        }
    }

    const handleViewApplication = (application: Application) => {
        setSelectedApplication(application)
        setIsViewingApplication(true)
    }

    const handleStatusChange = (applicationId: string, newStatus: string) => {
        // Here you would update the application status
        console.log(`Updating application ${applicationId} to status: ${newStatus}`)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
                    <div className="flex flex-col h-full relative">
                        <DialogHeader className="sticky top-0 z-50 bg-background p-4 border-b">
                            <DialogTitle>Applications for {opportunity.title}</DialogTitle>
                            <DialogDescription>
                                {opportunity.company?.companyName} • {sampleApplications.length} total applications
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-4">
                                {/* Search and Filters */}
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <Input
                                        placeholder="Search applications..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="max-w-sm"
                                    />
                                </div>

                                {/* Status Tabs */}
                                <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                                    <TabsList className="grid w-full grid-cols-5">
                                        <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
                                        <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
                                        <TabsTrigger value="approved">Approved ({statusCounts.approved})</TabsTrigger>
                                        <TabsTrigger value="interview">Interview ({statusCounts.interview})</TabsTrigger>
                                        <TabsTrigger value="rejected">Rejected ({statusCounts.rejected})</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                {/* Applications Table */}
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Applicant</TableHead>
                                                <TableHead>Contact</TableHead>
                                                <TableHead>Experience</TableHead>
                                                {/* <TableHead>Rating</TableHead> */}
                                                <TableHead>Status</TableHead>
                                                <TableHead>Applied</TableHead>
                                                <TableHead className="w-[50px]">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredApplications.length > 0 ? (
                                                filteredApplications.map((application) => (
                                                    <TableRow key={application.id}>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage
                                                                        src={application.avatar || "/placeholder.svg"}
                                                                        alt={application.applicantName}
                                                                    />
                                                                    <AvatarFallback>
                                                                        {application.applicantName
                                                                            .split(" ")
                                                                            .map((n) => n[0])
                                                                            .join("")}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="font-medium">{application.applicantName}</div>
                                                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                                        <MapPin className="h-3 w-3" />
                                                                        {application.location}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="space-y-1">
                                                                <div className="text-sm flex items-center gap-1">
                                                                    <Mail className="h-3 w-3" />
                                                                    {application.email}
                                                                </div>
                                                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                                    <Phone className="h-3 w-3" />
                                                                    {application.phone}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="text-sm">{application.experience}</div>
                                                        </TableCell>
                                                        {/* <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{application.rating}</span>
                              </div>
                            </TableCell> */}
                                                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                                                        <TableCell>
                                                            <div className="text-sm">{application.appliedAt}</div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                                        <span className="sr-only">Open menu</span>
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                    <DropdownMenuItem onClick={() => handleViewApplication(application)}>
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View Details
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Download className="mr-2 h-4 w-4" />
                                                                        Download Resume
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <MessageSquare className="mr-2 h-4 w-4" />
                                                                        Send Message
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem onClick={() => handleStatusChange(application.id, "approved")}>
                                                                        <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                                                        Approve
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => handleStatusChange(application.id, "interview")}>
                                                                        <Clock className="mr-2 h-4 w-4 text-blue-600" />
                                                                        Schedule Interview
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => handleStatusChange(application.id, "rejected")}>
                                                                        <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                                                        Reject
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="h-24 text-center">
                                                        No applications found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="sticky bottom-0 bg-background z-50 border-t p-4">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Close
                            </Button>
                            <Button>Export Applications</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Application Detail Dialog */}
            {selectedApplication && (
                <Dialog open={isViewingApplication} onOpenChange={setIsViewingApplication}>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
                        <div className="flex flex-col h-full relative">
                            <DialogHeader className="sticky top-0 z-50 bg-background p-4 border-b">
                                <DialogTitle>{selectedApplication.applicantName}</DialogTitle>
                                <DialogDescription>Application for {opportunity.title}</DialogDescription>
                            </DialogHeader>

                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-6">
                                    {/* Applicant Info */}
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage
                                                src={selectedApplication.avatar || "/placeholder.svg"}
                                                alt={selectedApplication.applicantName}
                                            />
                                            <AvatarFallback className="text-lg">
                                                {selectedApplication.applicantName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{selectedApplication.applicantName}</h3>
                                            {/* <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedApplication.rating} rating</span>
                      </div> */}
                                            <div className="mt-2">{getStatusBadge(selectedApplication.status)}</div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-3">CONTACT INFORMATION</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{selectedApplication.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{selectedApplication.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{selectedApplication.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-3">EXPERIENCE</h4>
                                        <p className="text-sm">{selectedApplication.experience}</p>
                                    </div>

                                    {/* Cover Letter */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-3">COVER LETTER</h4>
                                        <p className="text-sm leading-relaxed">{selectedApplication.coverLetter}</p>
                                    </div>

                                    {/* Resume */}
                                    {selectedApplication.resume && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-muted-foreground mb-3">RESUME</h4>
                                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                                                <Download className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <p className="text-sm font-medium">{selectedApplication.resume}</p>
                                                    <p className="text-xs text-muted-foreground">PDF Document</p>
                                                </div>
                                                <Button size="sm" variant="outline" className="ml-auto">
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Application Details */}
                                    <div className="flex justify-between text-xs text-muted-foreground pt-4 border-t">
                                        <span>Application ID: {selectedApplication.id}</span>
                                        <span>Applied: {selectedApplication.appliedAt}</span>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="sticky bottom-0 bg-background z-50 border-t p-4">
                                <Button variant="outline" onClick={() => setIsViewingApplication(false)}>
                                    Close
                                </Button>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleStatusChange(selectedApplication.id, "rejected")}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject
                                    </Button>
                                    <Button variant="outline" onClick={() => handleStatusChange(selectedApplication.id, "interview")}>
                                        <Clock className="mr-2 h-4 w-4" />
                                        Interview
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusChange(selectedApplication.id, "approved")}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve
                                    </Button>
                                </div>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}