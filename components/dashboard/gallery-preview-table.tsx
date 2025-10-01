"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Pencil, Trash2 } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=60&width=90",
    location: "New Bedford, bd",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=60&width=90",
    location: "New Bedford, bd",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=60&width=90",
    location: "New Bedford, bd",
  },
]

export function GalleryPreviewTable() {
  return (
    <div className="bg-white rounded-lg border border-[#e6e7e6]">
      <div className="p-6 border-b border-[#e6e7e6] flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1a1a1a]">Gallery</h2>
        <Link href="/dashboard/gallery" className="text-sm font-medium text-[#c7933b] hover:underline">
          See all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f9fafb]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                Locations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6e7e6]">
            {galleryItems.map((item) => (
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
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
