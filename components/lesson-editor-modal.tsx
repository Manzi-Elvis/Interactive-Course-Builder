"use client"

import { XIcon } from "./simple-icons"
import { useState } from "react"

interface LessonEditorModalProps {
  isOpen: boolean
  lesson?: {
    id: string
    title: string
    videoUrl?: string
    notes?: string
  }
  onClose: () => void
  onSave: (data: any) => void
}

export function LessonEditorModal({ isOpen, lesson, onClose, onSave }: LessonEditorModalProps) {
  const [title, setTitle] = useState(lesson?.title || "")
  const [videoUrl, setVideoUrl] = useState(lesson?.videoUrl || "")
  const [notes, setNotes] = useState(lesson?.notes || "")
  const [videoType, setVideoType] = useState<"url" | "upload">("url")

  const handleSave = () => {
    onSave({
      id: lesson?.id || Math.random().toString(36).substr(2, 9),
      title,
      videoUrl: videoType === "url" ? videoUrl : "",
      notes,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-xl font-bold">{lesson ? "Edit" : "Create"} Lesson</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Lesson Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lesson title"
              className="input-field"
            />
          </div>

          {/* Video section */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Video Content</label>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setVideoType("url")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  videoType === "url" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                Video URL
              </button>
              <button
                onClick={() => setVideoType("upload")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  videoType === "upload" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                Upload
              </button>
            </div>

            {videoType === "url" ? (
              <div>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="YouTube or Vimeo URL"
                  className="input-field"
                />
                <p className="text-xs text-muted-foreground mt-2">Supported: YouTube, Vimeo, and direct MP4 URLs</p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <p className="font-medium text-foreground">Click to upload video</p>
                <p className="text-xs text-muted-foreground mt-1">MP4, WebM up to 100MB</p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Lesson Notes / Description</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write lesson notes, key points, or markdown content..."
              rows={6}
              className="input-field resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">Markdown supported</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex gap-3 justify-end p-6 border-t border-border bg-card">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save Lesson
          </button>
        </div>
      </div>
    </div>
  )
}
