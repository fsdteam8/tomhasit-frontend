"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Eye, Trash2 } from "lucide-react"
import { DeleteConfirmModal } from "@/components/dashboard/delete-confirm-modal"
import { ViewCommentModal } from "@/components/dashboard/view-comment-modal"
import { Pagination } from "@/components/dashboard/pagination"

// Mock data
const comments = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: "Olivia Rhye",
  email: "olivia@untitledui.com",
  review:
    "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  date: "Jan 06, 2025",
}))

export default function GotDialTonePage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<(typeof comments)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(comments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = comments.slice(startIndex, endIndex)

  const handleView = (comment: (typeof comments)[0]) => {
    setSelectedComment(comment)
    setIsViewModalOpen(true)
  }

  const handleDelete = (comment: (typeof comments)[0]) => {
    setSelectedComment(comment)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log("Deleting comment:", selectedComment?.id)
    setIsDeleteModalOpen(false)
    setSelectedComment(null)
  }

  return (
    <>
      <PageHeader title="Got Dial Tone" />

      <div className="p-8">
        <div className="bg-white rounded-lg border border-[#e6e7e6]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Visitor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Review</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e7e6]">
                {currentItems.map((comment) => (
                  <tr key={comment.id} className="hover:bg-[#f9fafb]">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a]">{comment.name}</p>
                        <p className="text-xs text-[#667085]">{comment.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#667085] line-clamp-2 max-w-md">{comment.review}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#667085]">{comment.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(comment)}
                          className="p-2 text-[#c7933b] hover:bg-[#f9f4eb] rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(comment)}
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
            totalItems={comments.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <ViewCommentModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} comment={selectedComment} />
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
