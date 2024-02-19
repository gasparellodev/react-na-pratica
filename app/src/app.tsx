import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";

export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

export interface Tag {
  title: string
  amountOfVideos: number
  id: string
}

export function App() {
  const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ['get-tags'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333')
      const data = await response.json()

      return data
    },
  })

  if (isLoading) {
    return null
  }

  return (
    <div className="py-10 space-y-8">
      <div>Header</div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <button className="inline-flex items-center gap-1.5 text-xs bg-teal-500 text-teal-950 font-medium rounded-full px-2 py-1">
            <Plus className="size-3" />
            Create new
          </button>
        </div>
        <div className="flex items-center justify-between">
          <Search className="size-3" />
        </div>
      </main>
    </div>
  );
}
