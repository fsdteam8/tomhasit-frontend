"use client"

import Link from "next/link"
import { Eye, Trash2 } from "lucide-react"

const comments = [
  {
    id: 1,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    review: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsu...",
    date: "Jan 06, 2025",
  },
  {
    id: 2,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    review: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsu...",
    date: "Jan 06, 2025",
  },
  {
    id: 3,
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    review: "Lorem... Lorem...",
    date: "Jan 06, 2025",
  },
]

export function RecentCommentsTable() {
  return (
    <div className="bg-white rounded-lg border border-[#e6e7e6]">
      <div className="p-6 border-b border-[#e6e7e6] flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1a1a1a]">Recent Got Dial Tone?</h2>
        <Link href="/dashboard/got-dial-tone" className="text-sm font-medium text-[#c7933b] hover:underline">
          See all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f9fafb]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                Visitor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                Review
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#667085] uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6e7e6]">
            {comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-[#f9fafb]">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">{comment.name}</p>
                    <p className="text-xs text-[#667085]">{comment.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#667085] line-clamp-2">{comment.review}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#667085]">{comment.date}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#c7933b] hover:bg-[#f9f4eb] rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
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
