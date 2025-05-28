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

import { OpportunityForm } from "@/components/opportunities/opportunity-form";
import { OpportunityViewDialog } from "@/components/opportunities/opportunities-view-dialog";
import { OpportunityApplicationsDialog } from "@/components/opportunities/opportunity-applications-dialog";


// Tipos mínimos para visual
type Company = { companyName: string; id: number };
type OpportunityFull = {
    id: number;
    title: string;
    company: Company;
    targetIndustry: string;
    commissionPercentage: number;
    applicationsCount: number;
    createdAt: string;
    contentDescription: string;
    pricingStructureNotes: string;
};

const data: OpportunityFull[] = [
    {
        id: 1,
        title: "Enterprise Software Sales",
        company: { companyName: "Acme Corporation", id: 1 },
        targetIndustry: "Software",
        commissionPercentage: 15,
        applicationsCount: 12,
        createdAt: "2023-01-15",
        contentDescription: "Looking for experienced sales representatives to help sell our enterprise software solutions to large corporations.",
        pricingStructureNotes: "Minimum 3 years of B2B sales experience. Knowledge of enterprise software solutions. Strong communication skills.",
    },
    {
        id: 2,
        title: "Cloud Services Partnership",
        company: { companyName: "TechSolutions", id: 2 },
        targetIndustry: "Cloud",
        commissionPercentage: 15,
        applicationsCount: 8,
        createdAt: "2023-02-20",
        contentDescription: "Seeking partners to help expand our cloud services to new markets and industries.",
        pricingStructureNotes: "Experience in cloud technology sales. Existing network of potential clients. Ability to explain complex technical solutions.",
    },
];

export function OpportunitiesTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [opportunities, setOpportunities] = React.useState<OpportunityFull[]>(data);
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = React.useState<OpportunityFull | null>(null);
    const [activeTab, setActiveTab] = React.useState<string>("all");
    const [isApplicationsDialogOpen, setIsApplicationsDialogOpen] = React.useState(false);

    // Crear oportunidad (solo visual)
    function onCreateSubmit(values: any) {
        const newOpportunity: OpportunityFull = {
            id: opportunities.length + 1,
            title: values.title,
            company: { companyName: "Demo Company", id: Number(values.companyId) || 0 },
            targetIndustry: values.targetIndustry || "Other",
            commissionPercentage: Number(values.commissionPercentage) || 0,
            applicationsCount: 0,
            createdAt: new Date().toISOString().slice(0, 10),
            contentDescription: values.contentDescription || "",
            pricingStructureNotes: values.pricingStructureNotes || "",
        };
        setOpportunities([...opportunities, newOpportunity]);
        setIsAddDialogOpen(false);
    }

    // Editar oportunidad (solo visual)
    function onEditSubmit(values: any) {
        if (!selectedOpportunity) return;
        const updatedOpportunities = opportunities.map((opportunity) => {
            if (opportunity.id === selectedOpportunity.id) {
                return {
                    ...opportunity,
                    ...values,
                    company: { companyName: "Demo Company", id: Number(values.companyId) || 0 },
                };
            }
            return opportunity;
        });
        setOpportunities(updatedOpportunities);
        setIsEditDialogOpen(false);
        setSelectedOpportunity(null);
    }

    // Abrir editar
    const handleEdit = (opportunity: OpportunityFull) => {
        setSelectedOpportunity(opportunity);
        setIsEditDialogOpen(true);
    };

    // Abrir ver
    const handleView = (opportunity: OpportunityFull) => {
        setSelectedOpportunity(opportunity);
        setIsViewDialogOpen(true);
    };

    // Eliminar
    const handleDelete = (opportunityId: number) => {
        setSelectedOpportunity(opportunities.find(o => o.id === opportunityId) || null);
        setIsDeleteDialogOpen(true);
    };

    // Confirmar eliminar
    const deleteOpportunities = () => {
        setOpportunities(
            opportunities.filter(
                (opportunity) => opportunity.id !== selectedOpportunity?.id
            )
        );
        setIsDeleteDialogOpen(false);
        setSelectedOpportunity(null);
    };

    // Valores iniciales para editar
    const getEditInitialValues = (opportunity: OpportunityFull) => ({
        title: opportunity.title,
        companyId: opportunity.company.id,
        targetIndustry: opportunity.targetIndustry,
        commissionPercentage: opportunity.commissionPercentage,
        contentDescription: opportunity.contentDescription,
        pricingStructureNotes: opportunity.pricingStructureNotes,
    });

    // Abrir aplicaciones
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
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
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
        {
            accessorKey: "applicationsCount",
            header: "Applications",
            cell: ({ row }) => (
                <div className="text-center">{row.getValue("applicationsCount")}</div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
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
                companies={[]}
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
                    companies={[]}
                />
            )}

            {/* View Opportunity Dialog */}
            <OpportunityViewDialog
                open={isViewDialogOpen}
                onOpenChange={setIsViewDialogOpen}
                opportunity={selectedOpportunity}
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