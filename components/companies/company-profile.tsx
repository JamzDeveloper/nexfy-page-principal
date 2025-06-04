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

export function CompanyProfile() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Company Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* User Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">User Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" className="mt-1" defaultValue="jose" />
                            </div>
                            <div>
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" className="mt-1" defaultValue="company" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" className="mt-1" defaultValue="josecompany@gmail.com" />
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

                    {/* Company Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>

                        <div>
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" className="mt-1" defaultValue="CompanyJose" />
                        </div>

                        <div>
                            <Label htmlFor="company-logo">Company Logo</Label>
                            <div className="flex mt-1">
                                <Input id="company-logo" type="file" onChange={handleFileChange} className="hidden" />
                                <Button
                                    variant="outline"
                                    onClick={() => document.getElementById("company-logo")?.click()}
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
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="industry">Industry</Label>
                                <Select defaultValue="automotive">
                                    <SelectTrigger id="industry" className="mt-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="automotive">Automotive</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="retail">Retail</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="target-industries">Target Industries</Label>
                                <Select defaultValue="automotive">
                                    <SelectTrigger id="target-industries" className="mt-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="automotive">Automotive</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="retail">Retail</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <Label htmlFor="activity">Activity</Label>
                                <Select>
                                    <SelectTrigger id="activity" className="mt-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                        <SelectItem value="services">Services</SelectItem>
                                        <SelectItem value="retail">Retail</SelectItem>
                                        <SelectItem value="consulting">Consulting</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="company-type">Company Type</Label>
                                <Select>
                                    <SelectTrigger id="company-type" className="mt-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="corporation">Corporation</SelectItem>
                                        <SelectItem value="llc">LLC</SelectItem>
                                        <SelectItem value="partnership">Partnership</SelectItem>
                                        <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="employees">Number of Employees</Label>
                            <Input id="employees" className="mt-1" placeholder="Number of Employees" />
                        </div>
                    </div>

                    <Separator />

                    {/* Billing Address Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Billing Company Address</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="street">Street</Label>
                                <Input id="street" className="mt-1" placeholder="Street" />
                            </div>
                            <div>
                                <Label htmlFor="number">Number</Label>
                                <Input id="number" className="mt-1" placeholder="Number" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input id="city" className="mt-1" placeholder="City" />
                            </div>
                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input id="state" className="mt-1" placeholder="State" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="postal-code">Postal Code</Label>
                            <Input id="postal-code" className="mt-1 max-w-xs" placeholder="Postal Code" />
                        </div>
                    </div>

                    <Separator />

                    {/* Social Media Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="website">Website</Label>
                                <Input id="website" className="mt-1" placeholder="Website" />
                            </div>
                            <div>
                                <Label htmlFor="facebook">Facebook</Label>
                                <Input id="facebook" className="mt-1" placeholder="Facebook" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="instagram">Instagram</Label>
                                <Input id="instagram" className="mt-1" placeholder="Instagram" />
                            </div>
                            <div>
                                <Label htmlFor="twitter">Twitter</Label>
                                <Input id="twitter" className="mt-1" placeholder="Twitter" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <Input id="linkedin" className="mt-1" placeholder="LinkedIn" />
                            </div>
                            <div>
                                <Label htmlFor="tiktok">Tik Tok</Label>
                                <Input id="tiktok" className="mt-1" placeholder="Tik Tok" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="youtube">YouTube</Label>
                            <Input id="youtube" className="mt-1 max-w-md" placeholder="YouTube" />
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                        <Button className="bg-blue-500 hover:bg-blue-600 px-8">Update Profile</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
