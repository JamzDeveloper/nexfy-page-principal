"use client";

import * as React from "react";
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    PlusCircle,
    Trash2,
    Edit,
    Eye,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    OpportunityForm,
    type OpportunityFormValues,
} from "@/components/opportunities/opportunity-form";
import { OpportunityViewDialog } from "@/components/opportunities/opportunities-view-dialog";
import { OpportunityApplicationsDialog } from "@/components/opportunities/opportunity-applications-dialog";
import { Company } from "@/types/company";
import {
    CreateOpportunityFormInput,
    OpportunityFull,
} from "@/types/opportunity";
import { createOpportunityApi } from "@/lib/api/opportunity";
import { toast } from "../ui/use-toast";

// const data: OpportunityFull[] = [
//   {
//     id: 1,
//     title: "Enterprise Software Sales",
//     company: { companyName: "Acme Corporation", id: 1 },

//     targetIndustry: "Software",
//     commissionPercentage: 15,
//     // status: "active",
//     applicationsCount: 12,
//     createdAt: "2023-01-15",
//     contentDescription:
//       "Looking for experienced sales representatives to help sell our enterprise software solutions to large corporations.",
//     pricingStructureNotes:
//       "Minimum 3 years of B2B sales experience. Knowledge of enterprise software solutions. Strong communication skills.",
//   },
//   {
//     id: 2,
//     title: "Cloud Services Partnership",
//     // company: "TechSolutions Inc",
//     company: { companyName: "TechSolutions", id: 2 },

//     targetIndustry: "Cloud",
//     commissionPercentage: 15,
//     // status: "active",
//     applicationsCount: 8,
//     createdAt: "2023-02-20",
//     contentDescription:
//       "Seeking partners to help expand our cloud services to new markets and industries.",
//     pricingStructureNotes:
//       "Experience in cloud technology sales. Existing network of potential clients. Ability to explain complex technical solutions.",
//   },
//   {
//     id: 3,
//     title: "International Market Expansion",
//     // company: "Global Enterprises",
//     company: { companyName: "Global Enterprises", id: 3 },

//     targetIndustry: "Consulting",
//     commissionPercentage: 18,
//     // status: "closed",
//     applicationsCount: 5,
//     createdAt: "2023-03-10",
//     contentDescription:
//       "Looking for consultants with international business experience to help us expand into new markets.",
//     pricingStructureNotes:
//       "International business experience. Knowledge of market entry strategies. Language skills a plus.",
//   },
//   {
//     id: 4,
//     title: "Healthcare Software Distribution",
//     // company: "MedTech Solutions",
//     company: { companyName: "MedTech Solutions", id: 3 },

//     targetIndustry: "Healthcare",
//     commissionPercentage: 22,
//     // status: "active",
//     applicationsCount: 15,
//     createdAt: "2023-04-05",
//     contentDescription:
//       "Seeking sales agents to distribute our healthcare management software to hospitals and clinics.",
//     pricingStructureNotes:
//       "Experience in healthcare industry sales. Understanding of healthcare IT needs. Existing relationships with healthcare providers.",
//   },
//   {
//     id: 5,
//     title: "Retail Partnership Program",
//     // company: "Retail Giants",
//     company: { companyName: "MedTech Solutions", id: 3 },

//     targetIndustry: "Retail",
//     commissionPercentage: 12,
//     // status: "active",
//     applicationsCount: 20,
//     createdAt: "2023-05-12",
//     contentDescription:
//       "Looking for partners to help sell our retail management solutions to small and medium-sized businesses.",
//     pricingStructureNotes:
//       "Retail industry experience. Understanding of POS and inventory management systems. Strong sales track record.",
//   },
//   {
//     id: 6,
//     title: "Financial Services Sales",
//     // company: "Finance Pro",
//     company: { companyName: "MedTech Solutions", id: 3 },

//     targetIndustry: "Finance",
//     commissionPercentage: 25,
//     // status: "draft",
//     applicationsCount: 0,
//     createdAt: "2023-06-01",
//     contentDescription:
//       "Draft opportunity for financial services sales representatives.",
//     pricingStructureNotes:
//       "Financial services background. Appropriate certifications and licenses. Strong ethical standards.",
//   },
//   {
//     id: 6,
//     title: "Manufacturing Solutions",
//     // company: "Industrial Tech",
//     company: { companyName: "Industrial Solutions", id: 3 },

//     targetIndustry: "Manufacturing",
//     commissionPercentage: 15,
//     // status: "active",
//     applicationsCount: 7,
//     createdAt: "2023-06-15",
//     contentDescription:
//       "Seeking sales agents to promote our manufacturing automation solutions.",
//     pricingStructureNotes:
//       "Manufacturing industry experience. Technical understanding of automation systems. Project management skills.",
//   },
//   {
//     id: 7,
//     title: "Educational Software Sales",
//     // company: "EduTech Inc",
//     company: { companyName: "Industrial Solutions", id: 3 },

//     targetIndustry: "Education",
//     commissionPercentage: 18,
//     // status: "active",
//     applicationsCount: 10,
//     createdAt: "2023-07-01",
//     contentDescription:
//       "Looking for representatives to sell our educational software to schools and universities.",
//     pricingStructureNotes:
//       "Experience in education sector sales. Understanding of educational technology needs. Patience and excellent communication skills.",
//   },
//   {
//     id: 8,
//     title: "Logistics Partnership",
//     // company: "Global Logistics",
//     company: { companyName: "Global Solutions", id: 3 },

//     targetIndustry: "Logistics",
//     commissionPercentage: 18,
//     // status: "closed",
//     applicationsCount: 6,
//     createdAt: "2023-07-15",
//     contentDescription:
//       "Seeking partners to help sell our logistics management solutions.",
//     pricingStructureNotes:
//       "Logistics industry experience. Understanding of supply chain management. Network of potential clients.",
//   },
//   // {
//   //   id: "OP-010",
//   //   title: "Security Solutions Sales",
//   //   company: "SecureTech",
//   //   targetIndustry: "Security",
//   //   commissionPercentage: "20%",
//   //   // status: "active",
//   //   applicationsCount: 9,
//   //   createdAt: "2023-08-01",
//   //   description:
//   //     "Looking for sales representatives to promote our cybersecurity solutions to businesses.",
//   //   pricingStructureNotes:
//   //     "Cybersecurity knowledge. B2B sales experience. Ability to explain technical concepts to non-technical audiences.",
//   // },
// ];

export function OpportunitiesTable({
    companies,
    opportunities: data,
    token,
}: {
    companies: Company[];
    opportunities: OpportunityFull[];
    token: string;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [opportunities, setOpportunities] =
        React.useState<OpportunityFull[]>(data);
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [selectedOpportunity, setSelectedOpportunity] =
        React.useState<OpportunityFull | null>(null);
    const [activeTab, setActiveTab] = React.useState<string>("all");
    const [isApplicationsDialogOpen, setIsApplicationsDialogOpen] =
        React.useState(false);

    // Handle form submission for adding a new opportunity
    async function onCreateSubmit(values: OpportunityFormValues) {
        try {
            console.log("on submit qa", values.qa);
            // Preparar los datos para enviar al backend según el DTO

            console.log("onCreateSubmit", values);
            const opportunityData = {
                companyId: values.companyId, // String que representa un número
                title: values.title,
                ...(values.targetIndustry && { targetIndustry: values.targetIndustry }),
                ...(values.languages &&
                    values.languages.length > 0 && { languages: values.languages }),
                ...(values.currency && { currency: values.currency }),
                ...(values.country && { country: values.country }),
                ...(values.city && { city: values.city }),
                ...(values.targetAudience && { targetAudience: values.targetAudience }),
                ...(values.contentDescription && {
                    contentDescription: values.contentDescription,
                }),
                ...(values.averageDealValue !== undefined && {
                    averageDealValue: values.averageDealValue,
                }),
                ...(values.pricingStructureNotes && {
                    pricingStructureNotes: values.pricingStructureNotes,
                }),
                ...(values.commissionPercentage !== undefined && {
                    commissionPercentage: values.commissionPercentage,
                }),
                ...(values.deliverLeads !== undefined && {
                    deliverLeads: values.deliverLeads,
                }),
                ...(values.salesCycleEstimation && {
                    salesCycleEstimation: values.salesCycleEstimation,
                }),
                ...(values.qa && values.qa.length > 0 && { qa: values.qa }),
                ...(values.videoLinks &&
                    values.videoLinks.length > 0 && { videoLinks: values.videoLinks }),
            };

            // console.log("Datos a enviar al backend:", opportunityData);

            // Aquí harías la llamada a la API
            // await createOpportunityApi(opportunityData, token)

            // Por ahora, crear el objeto para la tabla local
            const newOpportunity: CreateOpportunityFormInput = {
                title: values.title,
                companyId: values.companyId,
                targetIndustry: values.targetIndustry || "Other",
                commissionPercentage: values.commissionPercentage
                    ? values.commissionPercentage
                    : 0,
                currency: values.currency,
                languages: values.languages,
                country: values.country,
                city: values.city,
                targetAudience: values.targetAudience,
                averageDealValue: values.averageDealValue,
                deliverLeads: values.deliverLeads,
                salesCycleEstimation: values.salesCycleEstimation,
                qa: values.qa,
                documents: values.documents,
                images: values.images,
                // status: "draft", // Por defecto draft ya que no hay campo status en el DTO
                contentDescription: values.contentDescription,
                pricingStructureNotes: values.pricingStructureNotes || "",
                videoLinks: values.videoLinks
            };

            // setOpportunities([...opportunities, newOpportunity]);
            const result = await createOpportunityApi(newOpportunity, token!);

            if (result) {
                // const freshOpportunities = await fetch
                console.log("creacion de usuarios", result);
                toast({
                    title: "Creacion Exitosa",
                    description: `La creacion fue exitosa`,
                });
            } else {
                toast({
                    title: "Error",
                    description: "No se pudo crear la oportunidad. Inténtalo de nuevo.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            toast({
                title: "Error",
                description: "No se pudo crear la oportunidad. Inténtalo de nuevo.",
                variant: "destructive",
            });
        } finally {
            setIsAddDialogOpen(false);
            // form.reset();
        }
    }

    // Handle form submission for editing an opportunity
    function onEditSubmit(values: OpportunityFormValues) {
        if (!selectedOpportunity) return;

        // Update the opportunity with the form values
        const updatedOpportunities = opportunities.map((opportunity) => {
            if (opportunity.id === selectedOpportunity.id) {
                return {
                    ...opportunity,
                    title: values.title,
                    companyId: values.companyId,
                    targetIndustry: values.targetIndustry || "Other",
                    commissionPercentage: values.commissionPercentage
                        ? values.commissionPercentage
                        : 0,
                    contentDescription: values.contentDescription,
                    pricingStructureNotes: values.pricingStructureNotes || "",
                };
            }
            return opportunity;
        });

        // Update the opportunities array
        setOpportunities(updatedOpportunities);

        // Close the dialog and reset the form
        setIsEditDialogOpen(false);
        setSelectedOpportunity(null);
    }

    // Handle opening the edit dialog
    const handleEdit = (opportunity: OpportunityFull) => {
        setSelectedOpportunity(opportunity);
        setIsEditDialogOpen(true);
    };

    // Handle opening the view dialog
    const handleView = (opportunity: OpportunityFull) => {
        setSelectedOpportunity(opportunity);
        setIsViewDialogOpen(true);
    };

    // Handle deleting an opportunity
    const handleDelete = (opportunityId: number) => {
        setIsDeleteDialogOpen(true);
    };

    // Delete opportunities
    const deleteOpportunities = () => {
        setOpportunities(
            opportunities.filter(
                (opportunity) => opportunity.id !== selectedOpportunity?.id
            )
        );
        setIsDeleteDialogOpen(false);
    };

    // Prepare initial values for edit form
    const getEditInitialValues = (
        opportunity: OpportunityFull
    ): Partial<OpportunityFormValues> => {
        return {
            companyId: Number(opportunity.company),
            title: opportunity.title,
            targetIndustry: opportunity.targetIndustry,
            languages: [],
            currency: "USD",
            country: "",
            city: "",
            targetAudience: "",
            contentDescription: opportunity.contentDescription || "",
            averageDealValue: 0,
            pricingStructureNotes: opportunity.pricingStructureNotes || "",
            commissionPercentage: Number(opportunity.commissionPercentage) || 0,
            deliverLeads: false,
            salesCycleEstimation: "",
            qa: [],
            videoLinks: [],
            documents: [],
            images: [],
        };
    };

    // Handle opening the applicationsCount dialog
    const handleViewApplications = (opportunity: OpportunityFull) => {
        setSelectedOpportunity(opportunity);
        setIsApplicationsDialogOpen(true);
    };

    const columns: ColumnDef<OpportunityFull>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("id")}</div>
            ),
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("title")}</div>
            ),
        },
        {
            accessorKey: "company",
            header: "Company",
            cell: ({ row }) => {
                const company = row.getValue("company") as { companyName?: string };
                return <div>{company?.companyName ?? "N/A"}</div>;
            },
        },
        {
            accessorKey: "targetIndustry",
            header: "Category",
            cell: ({ row }) => <div>{row.getValue("targetIndustry")}</div>,
        },
        {
            accessorKey: "commissionPercentage",
            header: "Commission",
            cell: ({ row }) => <div>{row.getValue("commissionPercentage")}</div>,
        },
        // {
        //   accessorKey: "status",
        //   header: "Status",
        //   cell: ({ row }) => {
        //     const status = row.getValue("status") as string
        //     return (
        //       <Badge variant={status === "active" ? "default" : status === "closed" ? "secondary" : "outline"}>
        //         {status}
        //       </Badge>
        //     )
        //   },
        // },
        {
            accessorKey: "applicationsCount",
            header: "Applications",
            cell: ({ row }) => (
                <div className="text-center">{row.getValue("applicationsCount")}</div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created At
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const opportunity = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(opportunity.id!.toString())
                                }
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleView(opportunity)}>
                                <Eye className="mr-2 h-4 w-4" /> View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(opportunity)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit opportunity
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleViewApplications(opportunity)}
                            >
                                <Users className="mr-2 h-4 w-4" /> View applications
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDelete(opportunity.id!)}
                                className="text-red-600 dark:text-red-400"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete opportunity
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    // Filter opportunities based on status tab
    const filteredOpportunities = React.useMemo(() => {
        return opportunities;
    }, [opportunities, activeTab]);

    const table = useReactTable({
        data: filteredOpportunities,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Tabs
                    defaultValue="all"
                    className="w-full"
                    onValueChange={setActiveTab}
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <TabsList>
                            <TabsTrigger value="all">All Opportunities</TabsTrigger>
                            {/* <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger> */}
                        </TabsList>

                        <div className="flex items-center gap-2">
                            <Button onClick={() => setIsAddDialogOpen(true)}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Opportunity
                            </Button>
                        </div>
                    </div>
                </Tabs>
            </div>

            <div className="flex items-center justify-between">
                <Input
                    placeholder="Filter opportunities..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} opportunities
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Create Opportunity Form */}
            <OpportunityForm
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onSubmit={onCreateSubmit}
                companies={companies}
                title="Create New Opportunity"
                description="Create a comprehensive sales opportunity for agents to apply to."
                submitLabel="Create Opportunity"
                mode="create"
            />

            {/* Edit Opportunity Form */}
            {selectedOpportunity && (
                <OpportunityForm
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    onSubmit={onEditSubmit}
                    title="Edit Opportunity"
                    description="Make changes to the opportunity details."
                    submitLabel="Save Changes"
                    initialValues={getEditInitialValues(selectedOpportunity)}
                    mode="edit"
                    companies={companies}
                />
            )}

            {/* View Opportunity Dialog */}
            <OpportunityViewDialog
                open={isViewDialogOpen}
                onOpenChange={setIsViewDialogOpen}
                opportunity={selectedOpportunity}
                onEdit={handleEdit}
            />

            {/* View Applications Dialog */}
            <OpportunityApplicationsDialog
                open={isApplicationsDialogOpen}
                onOpenChange={setIsApplicationsDialogOpen}
                opportunity={selectedOpportunity}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Opportunity</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this opportunity? This action
                            cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={deleteOpportunities}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}