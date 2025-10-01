"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ViewCommentModalProps {
  isOpen: boolean
  onClose: () => void
  comment: {
    name: string
    email: string
    review: string
    date: string
  } | null
}

export function ViewCommentModal({ isOpen, onClose, comment }: ViewCommentModalProps) {
  if (!comment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#1a1a1a]">Comment Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#667085] mb-1">Visitor</p>
              <p className="text-base font-semibold text-[#1a1a1a]">{comment.name}</p>
              <p className="text-sm text-[#667085]">{comment.email}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-[#667085] mb-1">Date</p>
              <p className="text-base text-[#1a1a1a]">{comment.date}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-[#667085] mb-2">Review</p>
              <div className="bg-[#f9fafb] rounded-lg p-4 border border-[#e6e7e6]">
                <p className="text-sm text-[#344054] leading-relaxed">{comment.review}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose} className="bg-[#c7933b] hover:bg-[#b8842f] text-white">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
