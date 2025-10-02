// hooks/useReviews.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface ReviewItem {
  _id: string
  fullName: string
  comment: string
  createdAt: string
  updatedAt: string
}

interface ReviewResponse {
  success: boolean
  message: string
  statusCode: number
  data: ReviewItem[]
}

// Fetch all reviews
const fetchReviews = async (): Promise<ReviewItem[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/all-reviews`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch reviews')
  }
  
  const result: ReviewResponse = await response.json()
  return result.data
}

// Delete review
const deleteReview = async (id: string): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/${id}`,
    {
      method: 'DELETE',
    }
  )
  
  if (!response.ok) {
    throw new Error('Failed to delete review')
  }
}

// Custom hook for fetching reviews
export const useReviews = () => {
  return useQuery<ReviewItem[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Custom hook for deleting review
export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
}

// Export type for use in components
export type { ReviewItem }