"use client"

import { useState } from "react"
import Image from "next/image"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import { MapPin, Pencil, Trash2, Plus, Loader2 } from "lucide-react"
import { AddImageModal } from "@/components/dashboard/add-image-modal"
import { DeleteConfirmModal } from "@/components/dashboard/delete-confirm-modal"
import { Pagination } from "@/components/dashboard/pagination"
import { useGalleries, useDeleteGallery } from "@/hooks/useGallery"
import { toast } from "sonner" 

export default function GalleryPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Fetch galleries using custom hook
  const { data: galleries = [], isLoading, error } = useGalleries()
  
  // Delete gallery mutation
  const deleteMutation = useDeleteGallery()

  const totalPages = Math.ceil(galleries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = galleries.slice(startIndex, endIndex)

  const handleDelete = (id: string) => {
    setSelectedItemId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedItemId) return

    try {
      await deleteMutation.mutateAsync(selectedItemId)
      toast.success("Gallery item deleted successfully")
      setIsDeleteModalOpen(false)
      setSelectedItemId(null)
    } catch (error) {
      toast.error("Failed to delete gallery item")
      console.error("Delete error:", error)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-[#c7933b]" />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load galleries</p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Gallery"
        action={
          <Button 
            onClick={() => setIsAddModalOpen(true)} 
            className="bg-[#c7933b] hover:bg-[#b8842f] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        }
      />

      <div className="p-8">
        <div className="bg-white rounded-lg border border-[#e6e7e6]">
          {galleries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">No gallery items found</p>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#c7933b] hover:bg-[#b8842f] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Image
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Locations</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6e7e6]">
                    {currentItems.map((item) => (
                      <tr key={item._id} className="hover:bg-[#f9fafb]">
                        <td className="px-6 py-4">
                          <Image
                            src={item.image.url || "/placeholder.svg"}
                            alt={item.title}
                            width={90}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-[#667085]">
                            <MapPin className="h-4 w-4" />
                            {item.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-[#c7933b] hover:bg-[#f9f4eb] rounded-lg transition-colors">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              disabled={deleteMutation.isPending}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {deleteMutation.isPending && selectedItemId === item._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={galleries.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      <AddImageModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Are You Sure?"
        message="Are you sure you want to delete this gallery item?"
      />
    </>
  )
}