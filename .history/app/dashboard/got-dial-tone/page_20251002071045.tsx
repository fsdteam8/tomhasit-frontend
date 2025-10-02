"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Eye, Trash2, Loader2 } from "lucide-react"
import { DeleteConfirmModal } from "@/components/dashboard/delete-confirm-modal"
import { ViewCommentModal } from "@/components/dashboard/view-comment-modal"
import { Pagination } from "@/components/dashboard/pagination"
import { useReviews, useDeleteReview, type ReviewItem } from "@/hooks/useReviews"
import { toast } from "sonner"

export default function GotDialTonePage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch reviews using custom hook
  const { data: reviews = [], isLoading, error } = useReviews()
  
  // Delete review mutation
  const deleteMutation = useDeleteReview()

  const totalPages = Math.ceil(reviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = reviews.slice(startIndex, endIndex)

  const handleView = (review: ReviewItem) => {
    setSelectedReview(review)
    setIsViewModalOpen(true)
  }

  const handleDelete = (review: ReviewItem) => {
    setSelectedReview(review)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedReview) return

    try {
      await deleteMutation.mutateAsync(selectedReview._id)
      toast.success("Review deleted successfully")
      setIsDeleteModalOpen(false)
      setSelectedReview(null)
      
      // Reset to first page if current page is empty after deletion
      const remainingItems = reviews.length - 1
      const newTotalPages = Math.ceil(remainingItems / itemsPerPage)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      }
    } catch (error) {
      toast.error("Failed to delete review")
      console.error("Delete error:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <>
        <PageHeader title="Got Dial Tone" />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-[#c7933b]" />
        </div>
      </>
    )
  }

  // Error state
  if (error) {
    return (
      <>
        <PageHeader title="Got Dial Tone" />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 mb-2">Failed to load reviews</p>
            <p className="text-sm text-gray-500">{error.message}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Got Dial Tone" />

      <div className="p-8">
        <div className="bg-white rounded-lg border border-[#e6e7e6]">
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">No comment found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Visitor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">COmm</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#1a1a1a]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6e7e6]">
                    {currentItems.map((review) => (
                      <tr key={review._id} className="hover:bg-[#f9fafb]">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-[#1a1a1a]">{review.fullName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#667085] line-clamp-2 max-w-md">{review.comment}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#667085]">{formatDate(review.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(review)}
                              className="p-2 text-[#c7933b] hover:bg-[#f9f4eb] rounded-lg transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(review)}
                              disabled={deleteMutation.isPending}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {deleteMutation.isPending && selectedReview?._id === review._id ? (
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
                totalItems={reviews.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      <ViewCommentModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        comment={selectedReview ? {
          name: selectedReview.fullName,
          review: selectedReview.comment,
          date: formatDate(selectedReview.createdAt)
        } : null}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Are You Sure?"
        message="Are you sure you want to delete this review?"
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}