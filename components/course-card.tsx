"use client"

import { BookOpen, Users, Clock, MoreVertical, Play, Edit2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface CourseCardProps {
  id: string
  title: string
  description: string
  lessons: number
  students: number
  duration: string
  progress: number
  image: string
}

export function CourseCard({ id, title, description, lessons, students, duration, progress, image }: CourseCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="group relative rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      {/* Course image */}
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
        </div>
        {image && <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-lg text-card-foreground line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-border">
          <div className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-muted-foreground" />
            <span className="text-xs font-medium">{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-muted-foreground" />
            <span className="text-xs font-medium">{students}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-xs font-medium">{duration}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">Progress</span>
            <span className="text-xs font-semibold text-primary">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link
            href={`/builder/${id}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Edit2 size={16} />
            <span className="hidden sm:inline">Edit</span>
          </Link>
          <button className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-muted transition-all duration-200 flex items-center justify-center">
            <Play size={16} />
          </button>
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <MoreVertical size={18} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors">
                  Duplicate
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
