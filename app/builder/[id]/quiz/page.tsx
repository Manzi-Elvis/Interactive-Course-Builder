"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { QuizQuestionCard } from "@/components/quiz-question-card"
import { QuizEditorModal } from "@/components/quiz-editor-modal"
import { ChevronLeft, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

interface QuestionOption {
  id: string
  text: string
  isCorrect?: boolean
}

interface QuizQuestion {
  id: string
  title: string
  type: "multiple-choice" | "true-false" | "short-answer"
  options?: QuestionOption[]
  correctAnswer?: string
}

export default function QuizBuilder() {
  const params = useParams()
  const courseId = params.id as string

  const [quizTitle, setQuizTitle] = useState("Module 1 Assessment")
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "1",
      title: "What is React?",
      type: "multiple-choice",
      options: [
        { id: "1", text: "A JavaScript library", isCorrect: true },
        { id: "2", text: "A programming language", isCorrect: false },
        { id: "3", text: "A CSS framework", isCorrect: false },
      ],
    },
    {
      id: "2",
      title: "React was developed by Facebook",
      type: "true-false",
      options: [
        { id: "1", text: "True", isCorrect: true },
        { id: "2", text: "False", isCorrect: false },
      ],
    },
  ])

  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | undefined>()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleAddQuestion = () => {
    setEditingQuestion(undefined)
    setIsEditorOpen(true)
  }

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion(question)
    setIsEditorOpen(true)
  }

  const handleSaveQuestion = (question: QuizQuestion) => {
    if (editingQuestion) {
      setQuestions(questions.map((q) => (q.id === editingQuestion.id ? question : q)))
    } else {
      setQuestions([...questions, question])
    }
  }

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const handleDuplicateQuestion = (question: QuizQuestion) => {
    setQuestions([
      ...questions,
      {
        ...question,
        id: Math.random().toString(36).substr(2, 9),
      },
    ])
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href={`/builder/${courseId}`}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            title="Back to course"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            />
            <p className="text-sm text-muted-foreground">Create and manage quiz questions</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleAddQuestion} className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            <span>Add Question</span>
          </button>
          <button onClick={() => setIsPreviewOpen(!isPreviewOpen)} className="btn-secondary flex items-center gap-2">
            <Eye size={20} />
            <span>Preview</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Questions list */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Questions ({questions.length})</h2>
            <div className="space-y-2">
              {questions.map((question, index) => (
                <QuizQuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  onEdit={handleEditQuestion}
                  onDelete={handleDeleteQuestion}
                  onDuplicate={handleDuplicateQuestion}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          {isPreviewOpen && (
            <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6 sticky top-32 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{quizTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {questions.length} questions • {Math.ceil(questions.length * 1.5)} minutes
                </p>
              </div>

              {/* Questions preview */}
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-3">
                      {index + 1}. {question.title}
                    </p>

                    {question.type !== "short-answer" && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className={`p-2 rounded border transition-all ${
                              option.isCorrect
                                ? "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700"
                                : "bg-background border-border"
                            }`}
                          >
                            <span className="text-sm">
                              {option.text}
                              {option.isCorrect && (
                                <span className="ml-2 text-xs font-semibold text-green-600">✓ Correct</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "short-answer" && (
                      <div className="p-2 bg-background rounded border border-border text-sm">
                        <span className="text-muted-foreground">Expected: "{question.correctAnswer}"</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold">{questions.length}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Est. Duration</p>
                  <p className="text-2xl font-bold">{Math.ceil(questions.length * 1.5)}m</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="text-2xl font-bold">Mixed</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz editor modal */}
      <QuizEditorModal
        isOpen={isEditorOpen}
        question={editingQuestion}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveQuestion}
      />
    </LayoutWrapper>
  )
}
