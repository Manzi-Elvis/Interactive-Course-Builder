"use client"

import type React from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { LessonCard } from "@/components/lesson-card"
import { LessonEditorModal } from "@/components/lesson-editor-modal"
import { ExportModal } from "@/components/export-modal"
import { ChevronLeftIcon, PlusIcon, EyeIcon, DownloadIcon } from "@/components/simple-icons"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

interface Lesson {
  id: string
  title: string
  videoUrl?: string
  notes?: string
}

export default function CourseBuilder() {
  const params = useParams()
  const courseId = params.id as string

  const [courseTitle, setCourseTitle] = useState("React Fundamentals")
  const [courseDescription, setCourseDescription] = useState(
    "Learn the basics of React including hooks, components, and state management.",
  )
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "1",
      title: "Introduction to React",
      videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      notes: "Cover basic React concepts and setup",
    },
    {
      id: "2",
      title: "Components & Props",
      videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      notes: "Understand functional and class components",
    },
  ])

  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>()
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isExportOpen, setIsExportOpen] = useState(false)

  const handleAddLesson = () => {
    setEditingLesson(undefined)
    setIsEditorOpen(true)
  }

  const handleEditLesson = (id: string) => {
    const lesson = lessons.find((l) => l.id === id)
    setEditingLesson(lesson)
    setIsEditorOpen(true)
  }

  const handleSaveLesson = (data: Lesson) => {
    if (editingLesson) {
      setLessons(lessons.map((l) => (l.id === editingLesson.id ? data : l)))
    } else {
      setLessons([...lessons, data])
    }
  }

  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter((l) => l.id !== id))
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    const newLessons = [...lessons]
    const [draggedLesson] = newLessons.splice(draggedIndex, 1)
    newLessons.splice(dropIndex, 0, draggedLesson)
    setLessons(newLessons)
    setDraggedIndex(null)
  }

  const handleExport = () => {
    setIsExportOpen(true)
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-muted rounded-lg transition-colors" title="Back to dashboard">
            <ChevronLeftIcon size={24} />
          </Link>
          <div>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            />
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="text-sm text-muted-foreground bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 w-full resize-none"
              rows={2}
            />
          </div>
        </div>

        {/* Top controls */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleAddLesson} className="btn-primary flex items-center gap-2">
            <PlusIcon size={20} />
            <span>Add Lesson</span>
          </button>
          <button onClick={() => setIsPreviewOpen(!isPreviewOpen)} className="btn-secondary flex items-center gap-2">
            <EyeIcon size={20} />
            <span>Preview</span>
          </button>
          <button onClick={handleExport} className="btn-ghost flex items-center gap-2">
            <DownloadIcon size={20} />
            <span>Export</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Lessons List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Lessons ({lessons.length})</h2>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`transition-all ${draggedIndex === index ? "opacity-50" : "opacity-100"}`}
                >
                  <LessonCard
                    {...lesson}
                    index={index}
                    onEdit={handleEditLesson}
                    onDelete={handleDeleteLesson}
                    onDragStart={(e) => handleDragStart(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Preview */}
          {isPreviewOpen && (
            <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6 sticky top-32">
              <h3 className="text-lg font-semibold mb-4">Course Preview</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">{courseTitle}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{courseDescription}</p>
                </div>

                {/* Lessons preview */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Lessons:</p>
                  {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-foreground">
                        Lesson {index + 1}: {lesson.title}
                      </p>
                      {lesson.notes && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{lesson.notes}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Lessons</p>
                    <p className="text-2xl font-bold">{lessons.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Duration</p>
                    <p className="text-2xl font-bold">{lessons.length * 2}h</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lesson editor modal */}
      <LessonEditorModal
        isOpen={isEditorOpen}
        lesson={editingLesson}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveLesson}
      />

      {/* Export modal */}
      <ExportModal isOpen={isExportOpen} courseTitle={courseTitle} onClose={() => setIsExportOpen(false)} />
    </LayoutWrapper>
  )
}
