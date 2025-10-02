"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Plus, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateGallery } from "@/hooks/useGallery"
import { toast } from "sonner" // or your preferred toast library

interface AddImageModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddImageModal({ isOpen, onClose }: AddImageModalProps) {
  const [title, setTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const createMutation = useCreateGallery()

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
      createPreview(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      createPreview(file)
    }
  }

  const createPreview = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!title || !selectedFile) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      await createMutation.mutateAsync({
        title,
        image: selectedFile,
      })
      
      toast.success("Gallery item added successfully")
      handleClose()
    } catch (error) {
      toast.error("Failed to add gallery item")
      console.error("Upload error:", error)
    }
  }

  const handleClose = () => {
    setTitle("")
    setSelectedFile(null)
    setPreviewUrl(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#1a1a1a]">Add Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-[#344054]">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={createMutation.isPending}
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
                {previewUrl ? (
                  <div className="relative w-full max-w-xs">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null)
                        setPreviewUrl(null)
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      disabled={createMutation.isPending}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
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
                      <p className="text-xs text-[#667085]">Supported formats: JPG, PNG, GIF</p>
                    </div>
                  </>
                )}
                {selectedFile && !previewUrl && (
                  <p className="text-sm font-medium text-[#1a1a1a] mt-2">{selectedFile.name}</p>
                )}
                <input 
                  id="file-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileSelect} 
                  className="hidden"
                  disabled={createMutation.isPending}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!title || !selectedFile || createMutation.isPending}
              className="w-12 h-12 rounded-full bg-[#c7933b] hover:bg-[#b8842f] text-white p-0 disabled:opacity-50"
            >
              {createMutation.isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Plus className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}