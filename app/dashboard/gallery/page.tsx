"use client"

import { useState } from "react"
import Image from "next/image"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import { MapPin, Pencil, Trash2, Plus } from "lucide-react"
import { AddImageModal } from "@/components/dashboard/add-image-modal"
import { DeleteConfirmModal } from "@/components/dashboard/delete-confirm-modal"
import { Pagination } from "@/components/dashboard/pagination"

// Mock data
const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: `/placeholder.svg?height=60&width=90&query=gallery-image-${i + 1}`,
  location: "New Bedford, bd",
}))

export default function GalleryPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(galleryItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = galleryItems.slice(startIndex, endIndex)

  const handleDelete = (id: number) => {
    setSelectedItem(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log("Deleting item:", selectedItem)
    setIsDeleteModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <>
      <PageHeader
        title="Gallery"
        action={
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#c7933b] hover:bg-[#b8842f] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        }
      />

      <div className="p-8">
        <div className="bg-white rounded-lg border border-[#e6e7e6]">
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
                  <tr key={item.id} className="hover:bg-[#f9fafb]">
                    <td className="px-6 py-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt="Gallery item"
                        width={90}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-[#667085]">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-[#c7933b] hover:bg-[#f9f4eb] rounded-lg transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
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
            totalItems={galleryItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <AddImageModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Are You Sure?"
        message="Are you sure you want to delete this comment?"
      />
    </>
  )
}
