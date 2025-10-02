"use client"

import { AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are You Sure?",
  message = "Are you sure you want to delete this item?",
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <DialogTitle className="text-2xl font-semibold text-[#1a1a1a]">{title}</DialogTitle>
            <p className="text-sm text-[#667085]">{message}</p>
          </div>
        </DialogHeader>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} variant="outline" className="flex-1 border-[#e6e7e6] text-[#344054] bg-transparent">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
