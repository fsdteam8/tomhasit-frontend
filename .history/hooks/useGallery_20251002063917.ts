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

