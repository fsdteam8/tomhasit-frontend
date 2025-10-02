"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddImageModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddImageModal({ isOpen, onClose }: AddImageModalProps) {
  const [location, setLocation] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = () => {
    // TODO: Implement upload logic
    console.log("Uploading:", { location, file: selectedFile })
    onClose()
    setLocation("")
    setSelectedFile(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#1a1a1a]">Add Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-[#344054]">
              Locations
            </Label>
            <Input
              id="location"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-11 border-[#d0d5dd] focus:border-[#c7933b] focus:ring-[#c7933b]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#344054]">Upload Image</Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? "border-[#c7933b] bg-[#f9f4eb]" : "border-[#e6e7e6] bg-white"
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f9f4eb] flex items-center justify-center">
                  <Upload className="h-6 w-6 text-[#c7933b]" />
                </div>
                <div>
                  <p className="text-sm text-[#667085] mb-1">
                    <label htmlFor="file-upload" className="text-[#c7933b] font-medium cursor-pointer hover:underline">
                      Browse
                    </label>{" "}
                    and chose the files you want to upload from your computer
                  </p>
                  {selectedFile && <p className="text-sm font-medium text-[#1a1a1a] mt-2">{selectedFile.name}</p>}
                </div>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!location || !selectedFile}
              className="w-12 h-12 rounded-full bg-[#c7933b] hover:bg-[#b8842f] text-white p-0"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
