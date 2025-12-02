"use client"

import { ChevronLeft, ChevronRight, SkipBack, SkipForward, Play, Volume2, Maximize, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

export default function LessonPreview() {
  const params = useParams()
  const courseId = params.id as string

  const [currentLesson, setCurrentLesson] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(45)

  const lessons = [
    {
      id: "1",
      title: "Introduction to React",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      notes:
        "# Introduction to React\n\nReact is a JavaScript library for building user interfaces. Key concepts include:\n\n- Components\n- JSX\n- Props and State\n- Hooks\n\n## Getting Started\n\n1. Install Node.js\n2. Create a React app with `create-react-app`\n3. Start building components!",
      duration: "24:30",
    },
    {
      id: "2",
      title: "Components & Props",
      videoUrl: "https://www.youtube.com/embed/jQVn_PhjHDY",
      notes:
        "# Components & Props\n\n## Functional Components\nModern way to create React components using functions.\n\n## Class Components\nOlder approach using ES6 classes.\n\n## Props\nHow to pass data from parent to child components.",
      duration: "18:45",
    },
    {
      id: "3",
      title: "State & Hooks",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      notes:
        "# State & Hooks\n\n## useState Hook\nManage component state in functional components.\n\n## useEffect Hook\nHandle side effects in components.",
      duration: "22:15",
    },
  ]

  const lesson = lessons[currentLesson]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ChevronLeft size={24} />
            <span className="font-semibold hidden sm:inline">Back</span>
          </Link>
          <h1 className="text-xl font-bold text-center flex-1 px-4">Lesson Viewer</h1>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full p-4 sm:p-6">
        {/* Video player */}
        <div className="flex-1 space-y-4">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <Play size={32} className="text-white ml-1" fill="white" />
              </button>
            </div>

            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4 space-y-2">
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all">
                <div className="h-full bg-linear-to-r from-primary to-accent" style={{ width: `${progress}%` }} />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-white/20 rounded transition-colors">
                    <SkipBack size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-white/20 rounded transition-colors">
                    <Play size={16} fill="white" />
                  </button>
                  <button className="p-1.5 hover:bg-white/20 rounded transition-colors">
                    <SkipForward size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-white/20 rounded transition-colors">
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span>12:34 / 24:30</span>
                  <button className="p-1.5 hover:bg-white/20 rounded transition-colors ml-2">
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson info */}
          <div className="space-y-3">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{lesson.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">Duration: {lesson.duration}</p>
            </div>

            {/* Notes */}
            <div className="rounded-lg border border-border bg-card p-6 prose prose-sm dark:prose-invert max-w-none">
              <div className="prose-h1:text-lg prose-h1:font-bold prose-h2:text-base prose-h2:font-semibold prose-p:text-sm prose-p:text-muted-foreground">
                <p className="font-semibold text-foreground mb-3">Lesson Notes</p>
                <div className="whitespace-pre-wrap text-sm text-muted-foreground">{lesson.notes}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Lessons list */}
        <div className="w-full lg:w-80 rounded-lg border border-border bg-card p-4 h-fit sticky top-20 space-y-4">
          <h3 className="font-semibold text-foreground">Course Lessons</h3>

          <div className="space-y-2">
            {lessons.map((l, index) => (
              <button
                key={l.id}
                onClick={() => setCurrentLesson(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  currentLesson === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                <p className="font-medium text-sm">
                  {index + 1}. {l.title}
                </p>
                <p className="text-xs opacity-75 mt-1">{l.duration}</p>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <button
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
              disabled={currentLesson === 0}
              className="flex-1 p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline text-sm">Previous</span>
            </button>
            <button
              onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
              disabled={currentLesson === lessons.length - 1}
              className="flex-1 p-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <span className="hidden sm:inline text-sm">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
