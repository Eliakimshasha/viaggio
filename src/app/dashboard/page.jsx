"use client"
import { useState } from "react"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import { Label } from "../../../components/ui/Label"
import { Textarea } from "../../../components/ui/Textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { personalDetailsData, genderOptions, countryOptions } from "../../../components/lib/data"
import { Calendar } from "lucide-react"
import CountrySelect from "../../../components/CountrySelect"

export default function DashboardPage() {
  const [formData, setFormData] = useState(personalDetailsData)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Saving personal details:", formData)
    // Handle save logic here
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Personal Details</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="bg-white rounded-lg py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-600" htmlFor="fullName">Full Name</Label>
            <Input
            className="bg-white placeholder:text-gray-400"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600" htmlFor="email">Email</Label>
            <Input
            className="bg-white placeholder:text-gray-400"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600" htmlFor="dateOfBirth">Date Of Birth</Label>
            <div className="relative">
              <Input
              className="bg-white placeholder:text-gray-400"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                placeholder="DD - MM - YYYY"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600" htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger className="bg-white border border-gray-300 hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                {genderOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="bg-white hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600" htmlFor="nationality">Nationality</Label>
             <CountrySelect
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      nationality: value,
                    }))
                  }
                  value={formData.nationality}
                />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600" htmlFor="phone">Phone</Label>
            <Input
            className="bg-white placeholder:text-gray-400"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="E.g +255 743 404 942"
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label className="text-gray-600" htmlFor="additionalInfo">Additional Information</Label>
          <Textarea
            id="additionalInfo"
            className="bg-white border border-gray-300 hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            value={formData.additionalInfo}
            onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
            placeholder="Anything you would like us to know about you"
            rows={4}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
