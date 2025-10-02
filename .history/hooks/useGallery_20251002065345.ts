// hooks/useGallery.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface GalleryImage {
  public_id: string
  url: string
}

interface GalleryItem {
  _id: string
  image: GalleryImage
  title: string
  createdAt: string
  updatedAt: string
}

interface GalleryResponse {
  success: boolean
  message: string
  statusCode: number
  data: GalleryItem[]
}

interface CreateGalleryPayload {
  title: string
  image: File
}

interface UpdateGalleryPayload {
  id: string
  title: string
  image?: File
}

// Fetch all galleries
const fetchGalleries = async (): Promise<GalleryItem[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gallery/all-galleries`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch galleries')
  }
  
  const result: GalleryResponse = await response.json()
  return result.data
}

// Create gallery item
const createGallery = async (payload: CreateGalleryPayload): Promise<void> => {
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('image', payload.image)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gallery/add-gallery`,
    {
      method: 'POST',
      body: formData,
    }
  )
  
  if (!response.ok) {
    throw new Error('Failed to create gallery item')
  }
}

// Update gallery item
const updateGallery = async (payload: UpdateGalleryPayload): Promise<void> => {
  const formData = new FormData()
  formData.append('title', payload.title)
  if (payload.image) {
    formData.append('image', payload.image)
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gallery/update/${payload.id}`,
    {
      method: 'PUT',
      body: formData,
    }
  )
  
  if (!response.ok) {
    throw new Error('Failed to update gallery item')
  }
}

// Delete gallery item
const deleteGallery = async (id: string): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`,
    {
      method: 'DELETE',
    }
  )
  
  if (!response.ok) {
    throw new Error('Failed to delete gallery item')
  }
}

// Custom hook for fetching galleries
export const useGalleries = () => {
  return useQuery<GalleryItem[], Error>({
    queryKey: ['galleries'],
    queryFn: fetchGalleries,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Custom hook for creating gallery item
export const useCreateGallery = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleries'] })
    },
  })
}

// Custom hook for updating gallery item
export const useUpdateGallery = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleries'] })
    },
  })
}

// Custom hook for deleting gallery item
export const useDeleteGallery = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleries'] })
    },
  })
}