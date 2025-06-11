"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react"

export function CommercialAgentProfile() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    return (
        // <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Commercial Agent Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* User Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" className="mt-1" defaultValue="jose" />
                            </div>
                            <div>
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" className="mt-1" defaultValue="agent" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" className="mt-1" defaultValue="joseagent@gmail.com" />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" className="mt-1" placeholder="Password" />
                            <p className="text-xs text-muted-foreground mt-1">
                                Leave blank if you do not want to change the password.
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Professional Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Professional Information</h3>

                        <div>
                            <Label htmlFor="profile-image">Profile Image</Label>
                            <div className="flex mt-1">
                                <Input id="profile-image" type="file" onChange={handleFileChange} className="hidden" />
                                <Button
                                    variant="outline"
                                    onClick={() => document.getElementById("profile-image")?.click()}
                                    className="mr-2"
                                >
                                    Seleccionar archivo
                                </Button>
                                <span className="text-sm text-muted-foreground self-center">
                                    {selectedFile ? selectedFile.name : "Ningún archivo seleccionado"}
                                </span>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <div className="border rounded-md mt-1">
                                <div className="flex items-center border-b p-2 gap-1">
                                    <select className="text-sm border-0 bg-transparent outline-none">
                                        <option>Normal</option>
                                    </select>
                                    <div className="h-4 w-px bg-border mx-1"></div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Bold className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Italic className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Underline className="h-4 w-4" />
                                    </Button>
                                    <div className="h-4 w-px bg-border mx-1"></div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <List className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <ListOrdered className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Textarea
                                    id="description"
                                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    rows={5}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="languages">Languages</Label>
                                <Input id="languages" className="mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Select>
                                    <SelectTrigger id="location" className="mt-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="ca">Canada</SelectItem>
                                        <SelectItem value="mx">Mexico</SelectItem>
                                        <SelectItem value="es">Spain</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="skills">Skills</Label>
                                <Input id="skills" className="mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="industry">Industry</Label>
                                <Select>
                                    <SelectTrigger id="industry" className="mt-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tech">Technology</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="retail">Retail</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="seller-type">Seller Type</Label>
                                <Select>
                                    <SelectTrigger id="seller-type" className="mt-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="direct">Direct</SelectItem>
                                        <SelectItem value="broker">Broker</SelectItem>
                                        <SelectItem value="agent">Agent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="currency">Currency</Label>
                                <Select>
                                    <SelectTrigger id="currency" className="mt-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usd">USD</SelectItem>
                                        <SelectItem value="eur">EUR</SelectItem>
                                        <SelectItem value="gbp">GBP</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="selling-methods">Selling Methods</Label>
                                <Input id="selling-methods" className="mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="years-experience">Years of Experience</Label>
                                <Input id="years-experience" className="mt-1" placeholder="Years of Experience" />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                        <Button className="bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-slate-300 px-8">Save Profile</Button>
                    </div>
                </CardContent>
            </Card>
        // </div>
    )
}
