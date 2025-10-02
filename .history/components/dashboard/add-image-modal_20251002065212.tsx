"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, Plus, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateGallery, useUpdateGallery } from "@/hooks/useGallery"
import { toast } from "sonner" // or your preferred toast library

interface GalleryItem {
  _id: string
  title: string
  image: {
    url: string
    public_id: string
  }
}

interface AddImageModalProps {
  isOpen: boolean
  onClose: () => void
  editItem?: GalleryItem | null
}

export function AddImageModal({ isOpen, onClose, editItem = null }: AddImageModalProps) {
  const [title, setTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const createMutation = useCreateGallery()
  const updateMutation = useUpdateGallery()

  const isEditMode = !!editItem
  const isPending = createMutation.isPending || updateMutation.isPending

  // Populate form when editing
  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title)
      setPreviewUrl(editItem.image.url)
      setSelectedFile(null) // Clear file as we're showing existing image
    } else {
      setTitle("")
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }, [editItem, isOpen])

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
    if (!title) {
      toast.error("Please enter a title")
      return
    }

    if (!isEditMode && !selectedFile) {
      toast.error("Please select an image")
      return
    }

    try {
      if (isEditMode && editItem) {
        // Update existing gallery item
        await updateMutation.mutateAsync({
          id: editItem._id,
          title,
          image: selectedFile || undefined,
        })
        toast.success("Gallery item updated successfully")
      } else {
        // Create new gallery item
        if (!selectedFile) {
          toast.error("Please select an image")
          return
        }
        await createMutation.mutateAsync({
          title,
          image: selectedFile,
        })
        toast.success("Gallery item added successfully")
      }
      
      handleClose()
    } catch (error) {
      toast.error(isEditMode ? "Failed to update gallery item" : "Failed to add gallery item")
      console.error("Submit error:", error)
    }
  }

  const handleClose = () => {
    setTitle("")
    setSelectedFile(null)
    setPreviewUrl(null)
    onClose()
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl(isEditMode && editItem ? editItem.image.url : null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#1a1a1a]">
            {isEditMode ? "Edit Image" : "Add Image"}
          </DialogTitle>
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
              disabled={isPending}
              className="h-11 border-[#d0d5dd] focus:border-[#c7933b] focus:ring-[#c7933b]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#344054]">
              {isEditMode ? "Update Image (Optional)" : "Upload Image"}
            </Label>
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
                    {(!isEditMode || selectedFile) && (
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        disabled={isPending}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    {isEditMode && !selectedFile && (
                      <div className="mt-2">
                        <label 
                          htmlFor="file-upload-edit" 
                          className="text-[#c7933b] text-sm font-medium cursor-pointer hover:underline"
                        >
                          Change Image
                        </label>
                      </div>
                    )}
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
                  disabled={isPending}
                />
                <input 
                  id="file-upload-edit" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileSelect} 
                  className="hidden"
                  disabled={isPending}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {isEditMode && (
              <Button
                onClick={handleClose}
                disabled={isPending}
                variant="outline"
                className="px-6"
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={!title || (!isEditMode && !selectedFile) || isPending}
              className="w-12 h-12 rounded-full bg-[#c7933b] hover:bg-[#b8842f] text-white p-0 disabled:opacity-50"
            >
              {isPending ? (
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