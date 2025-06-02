"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Plus,
  Trash2,
  FileText,
  ImageIcon,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import * as z from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Company } from "@/types/company";
import { RichTextEditor } from "./rich-text-editor";

// Form schema actualizado para coincidir exactamente con el DTO
const opportunityFormSchema = z.object({
  companyId: z.number().min(1, { message: "Company ID is required." }), // IsNumberString
  title: z.string().min(5, { message: "Title must be at least 5 characters." }), // Required
  targetIndustry: z.string().optional(), // Optional
  languages: z.array(z.string()).optional(), // Optional array
  currency: z.string().optional(), // Optional
  country: z.string().optional(), // Optional
  city: z.string().optional(), // Optional
  targetAudience: z.string().optional(), // Optional
  contentDescription: z.string().optional(), // Optional
  averageDealValue: z.number().optional(), // Optional number
  pricingStructureNotes: z.string().optional(), // Optional
  commissionPercentage: z.number().optional(), // Optional number
  deliverLeads: z.boolean().optional(), // Optional boolean
  salesCycleEstimation: z.string().optional(), // Optional
  qa: z
    .array(
      z.object({
        question: z.string().min(1, { message: "Question is required." }),
        answer: z.string().min(1, { message: "Answer is required." }),
      })
    )
    .optional(), // Optional array of QaItem
  videoLinks: z
    .array(z.string().url({ message: "Must be a valid URL." }))
    .optional(), // Optional array of URLs
  documents: z
    .array(z.any())
    .max(2, { message: "Maximum 2 documents allowed." })
    .optional(), // Máximo 2 documentos
  images: z
    .array(z.any())
    .max(3, { message: "Maximum 3 images allowed." })
    .optional(), // Máximo 3 imágenes
});

export type OpportunityFormValues = z.infer<typeof opportunityFormSchema>;

interface OpportunityFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: OpportunityFormValues) => void;
  title: string;
  description: string;
  submitLabel: string;
  initialValues?: Partial<OpportunityFormValues>;
  mode?: "create" | "edit";
  companies: Company[];
}

export function OpportunityForm({
  open,
  onOpenChange,
  onSubmit,
  title,
  description,
  submitLabel,
  initialValues,
  mode = "create",
  companies,
}: OpportunityFormProps) {
  // Initialize form
  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunityFormSchema),
    defaultValues: {
      companyId: 0,
      title: "",
      targetIndustry: "",
      languages: [],
      currency: "USD",
      country: "",
      city: "",
      targetAudience: "",
      contentDescription: "",
      averageDealValue: 0,
      pricingStructureNotes: "",
      commissionPercentage: 0,
      deliverLeads: false,
      salesCycleEstimation: "",
      qa: [],
      videoLinks: [],
      documents: [],
      images: [],
      ...initialValues,
    },
  });

  // Reset form when initialValues change (for edit mode)
  React.useEffect(() => {
    if (
      companies.length === 1 &&
      (!form.getValues("companyId") || form.getValues("companyId") === 0)
    ) {
        form.setValue("companyId", companies[0].id);
        console.log("Set companyId automáticamente:", companies[0].id);
      }
    if (initialValues && mode === "edit") {
      form.reset({
        companyId: 0,
        title: "",
        targetIndustry: "",
        languages: [],
        currency: "USD",
        country: "",
        city: "",
        targetAudience: "",
        contentDescription: "",
        averageDealValue: 0,
        pricingStructureNotes: "",
        commissionPercentage: 0,
        deliverLeads: false,
        salesCycleEstimation: "",
        qa: [],
        videoLinks: [],
        documents: [],
        images: [],
        ...initialValues,
      });
    }
  }, [companies, initialValues, mode, form]);

  const handleSubmit = (values: OpportunityFormValues) => {
    console.log("Valores enviados:", values);
    onSubmit(values);
    if (mode === "create") {
      form.reset();
    }
  };

  console.log("Form is valid:", form.formState.isValid);
  console.log("Form errors:", form.formState.errors);

  const categories = [
    "Software",
    "Cloud",
    "Consulting",
    "Healthcare",
    "Retail",
    "Finance",
    "Manufacturing",
    "Education",
    "Logistics",
    "Security",
    "Other",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col h-full relative">
          <DialogHeader className="sticky top-0 z-50 bg-background p-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col flex-1"
            >
              <div className="flex-1 space-y-8 overflow-y-auto px-4 py-4">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CompanySearchField form={form} companies={companies} />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Opportunity Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter opportunity title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="contentDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Description</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Provide a detailed description of the opportunity with formatting..."
                            className="min-h-[200px]"
                          />
                        </FormControl>
                        <FormDescription>
                          Use the toolbar to format your text with bold, italic,
                          links, lists, and more.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Target Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Target Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="targetIndustry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Industry</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select target industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="targetAudience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Audience</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Describe the target audience"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Financial Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Financial Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="CAD">CAD</SelectItem>
                              <SelectItem value="AUD">AUD</SelectItem>
                              <SelectItem value="JPY">JPY</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="averageDealValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Deal Value</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="commissionPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission Percentage</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="15"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="pricingStructureNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pricing Structure Notes</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Additional notes about pricing structure with formatting..."
                            className="min-h-[150px] bg-red"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Sales Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    Sales Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="salesCycleEstimation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sales Cycle Estimation</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 3-6 months" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deliverLeads"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Deliver Leads</FormLabel>
                            <FormDescription>
                              Will you provide leads to sales agents?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Languages Section */}
                <LanguagesSection form={form} />

                {/* Q&A Section */}
                <QASection form={form} />

                {/* Video Links Section */}
                <VideoLinksSection form={form} />

                {/* Documents Section */}
                <DocumentsSection form={form} />

                {/* Images Section */}
                <ImagesSection form={form} />
              </div>

              <DialogFooter className="sticky bottom-0 bg-background z-50 mt-auto border-t p-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!form.formState.isValid}>
                  {submitLabel}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Componente para manejar idiomas
function LanguagesSection({
  form,
}: {
  form: UseFormReturn<OpportunityFormValues>;
}) {
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    form.getValues("languages") || []
  );
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
  ];

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "languages") {
        setSelectedLanguages((value.languages as any) || []);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const addLanguage = (language: string) => {
    if (!selectedLanguages.includes(language)) {
      const newLanguages = [...selectedLanguages, language];
      setSelectedLanguages(newLanguages);
      form.setValue("languages", newLanguages);
    }
  };

  const removeLanguage = (language: string) => {
    const newLanguages = selectedLanguages.filter((l) => l !== language);
    setSelectedLanguages(newLanguages);
    form.setValue("languages", newLanguages);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Languages</h3>
      <div className="space-y-2">
        <Select onValueChange={addLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Add a language" />
          </SelectTrigger>
          <SelectContent>
            {languages
              .filter((lang) => !selectedLanguages.includes(lang))
              .map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2">
          {selectedLanguages.map((language) => (
            <Badge
              key={language}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {language}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => removeLanguage(language)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para manejar Q&A
function QASection({ form }: { form: UseFormReturn<OpportunityFormValues> }) {
  const [qaItems, setQaItems] = React.useState<
    { question: string; answer: string }[]
  >(form.getValues("qa") || []);

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "qa") {
        setQaItems((value.qa as any) || []);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const addQaItem = () => {
    const newQa = [...qaItems, { question: "", answer: "" }];
    setQaItems(newQa);
    form.setValue("qa", newQa);
  };

  const updateQaItem = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newQa = [...qaItems];
    newQa[index][field] = value;
    setQaItems(newQa);
    form.setValue("qa", newQa);
  };

  const removeQaItem = (index: number) => {
    const newQa = qaItems.filter((_, i) => i !== index);
    setQaItems(newQa);
    form.setValue("qa", newQa);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold border-b pb-2">Q&A Section</h3>
        <Button type="button" variant="outline" size="sm" onClick={addQaItem}>
          <Plus className="mr-2 h-4 w-4" />
          Add Q&A
        </Button>
      </div>
      <div className="space-y-4">
        {qaItems.map((qa, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Q&A #{index + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeQaItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Enter question"
              value={qa.question}
              onChange={(e) => updateQaItem(index, "question", e.target.value)}
            />
            <Textarea
              placeholder="Enter answer"
              value={qa.answer}
              onChange={(e) => updateQaItem(index, "answer", e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para manejar Video Links
function VideoLinksSection({
  form,
}: {
  form: UseFormReturn<OpportunityFormValues>;
}) {
  const [videoLinks, setVideoLinks] = React.useState<string[]>(
    form.getValues("videoLinks") || []
  );

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "videoLinks") {
        setVideoLinks((value.videoLinks as any) || []);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const addVideoLink = () => {
    const newLinks = [...videoLinks, ""];
    setVideoLinks(newLinks);
    form.setValue("videoLinks", newLinks);
  };

  const updateVideoLink = (index: number, value: string) => {
    const newLinks = [...videoLinks];
    newLinks[index] = value;
    setVideoLinks(newLinks);
    form.setValue("videoLinks", newLinks);
  };

  const removeVideoLink = (index: number) => {
    const newLinks = videoLinks.filter((_, i) => i !== index);
    setVideoLinks(newLinks);
    form.setValue("videoLinks", newLinks);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold border-b pb-2">Video Links</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addVideoLink}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Video Link
        </Button>
      </div>
      <div className="space-y-2">
        {videoLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder="Enter video URL"
              value={link}
              onChange={(e) => updateVideoLink(index, e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeVideoLink(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para manejar Documents
function DocumentsSection({
  form,
}: {
  form: UseFormReturn<OpportunityFormValues>;
}) {
  const [documents, setDocuments] = React.useState<File[]>(
    form.getValues("documents") || []
  );

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "documents") {
        setDocuments(value.documents || []);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (documents.length + files.length > 2) {
      alert("Maximum 2 documents allowed");
      return;
    }

    const newDocuments = [...documents, ...files];
    setDocuments(newDocuments);
    form.setValue("documents", newDocuments);
  };

  const removeDocument = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
    form.setValue("documents", newDocuments);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold border-b pb-2">Documents</h3>
        <div className="text-sm text-muted-foreground">
          {documents.length}/2 documents
        </div>
      </div>

      {documents.length < 2 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <div className="relative">
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                multiple
                onChange={handleDocumentUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Click to upload documents or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX (Max 2 files)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-gray-500">
                    {(doc.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeDocument(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Componente para manejar Images
function ImagesSection({
  form,
}: {
  form: UseFormReturn<OpportunityFormValues>;
}) {
  const [images, setImages] = React.useState<File[]>(
    form.getValues("images") || []
  );
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "images") {
        setImages(value.images || []);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }
    // Validar tamaño de cada archivo (máximo 5MB por imagen)
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    const oversizedFiles = files.filter((file) => file.size > maxSizeInBytes);
    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map((file) => file.name).join(", ");
      alert(
        `The following images are too large (max ${maxSizeInMB}MB): ${fileNames}`
      );
      return;
    }
    // Validar que sean archivos de imagen válidos
    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const invalidFiles = files.filter(
      (file) => !validImageTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      const fileNames = invalidFiles.map((file) => file.name).join(", ");
      alert(`The following files are not valid images: ${fileNames}`);
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);
    form.setValue("images", newImages);

    // Generate previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
    form.setValue("images", newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold border-b pb-2">Images</h3>
        <div className="text-sm text-muted-foreground">
          {images.length}/3 images
        </div>
      </div>

      {images.length < 3 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Click to upload images or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG, GIF, WEBP (Max 3 files)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <div className="aspect-video rounded-lg overflow-hidden border">
                <img
                  src={imagePreviews[index] || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-2 right-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{img.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Componente para búsqueda de empresas
function CompanySearchField({
  form,
  companies,
}: {
  form: UseFormReturn<OpportunityFormValues>;
  companies: Company[];
}) {
  const company = companies[0]; // Asumimos que solo hay una compañía disponible
  
  React.useEffect(() => {
    if (company) {
      form.setValue("companyId", company.id);
    }
  }, [company, form]);

  return (
    <FormField
      control={form.control}
      name="companyId"
      render={() => (
        <FormItem>
          <FormLabel>Company</FormLabel>
          <FormControl>
            <Input
              value={company?.companyName || ""}
              readOnly
              disabled
              className="bg-muted cursor-not-allowed"
            />
          </FormControl>
          <FormDescription>
            Your registered company will be automatically selected
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}