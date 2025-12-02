"use client"

import type React from "react"

import { GripIcon, EditIcon, TrashIcon, PlayIcon } from "./simple-icons"
import { useState } from "react"

interface LessonCardProps {
  id: string
  title: string
  videoUrl?: string
  notesPreview?: string
  index: number
  isEditing?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onDragStart?: (e: React.DragEvent) => void
}

export function LessonCard({
  id,
  title,
  videoUrl,
  notesPreview,
  index,
  isEditing,
  onEdit,
  onDelete,
  onDragStart,
}: LessonCardProps) {
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="group rounded-lg border border-border bg-card p-4 hover:shadow-md transition-all duration-300 cursor-move"
    >
      <div className="flex items-start gap-3">
        {/* Drag handle */}
        <button className="p-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
          <GripIcon size={18} />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">
                Lesson {index + 1}: {title}
              </h3>
              {notesPreview && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notesPreview}</p>}
            </div>
            {/* Actions */}
            <div
              className={`flex gap-1 transition-all ${showActions ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            >
              <button
                onClick={() => onEdit?.(id)}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                title="Edit lesson"
              >
                <EditIcon size={16} />
              </button>
              <button
                onClick={() => onDelete?.(id)}
                className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                title="Delete lesson"
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </div>

          {/* Video indicator */}
          {videoUrl && (
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <PlayIcon size={14} />
              <span>Video attached</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
