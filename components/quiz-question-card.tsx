"use client"

import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "./simple-icons"
import { useState } from "react"

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

interface QuizQuestionCardProps {
  question: QuizQuestion
  index: number
  onEdit: (question: QuizQuestion) => void
  onDelete: (id: string) => void
  onDuplicate: (question: QuizQuestion) => void
}

export function QuizQuestionCard({ question, index, onEdit, onDelete, onDuplicate }: QuizQuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-all">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-3 text-left flex-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
            {index + 1}
          </div>
          <div>
            <p className="font-semibold text-foreground">{question.title}</p>
            <p className="text-xs text-muted-foreground capitalize">{question.type.replace("-", " ")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 py-4 space-y-4 border-t border-border bg-muted/30">
          {/* Options */}
          {question.options && question.options.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Options:</p>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2 p-2 bg-background rounded">
                    <div
                      className={`w-4 h-4 rounded border-2 ${
                        option.isCorrect ? "bg-green-500 border-green-600" : "border-border"
                      }`}
                    />
                    <span className="text-sm text-foreground">{option.text}</span>
                    {option.isCorrect && <span className="ml-auto text-xs font-semibold text-green-600">Correct</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-border">
            <button
              onClick={() => onEdit(question)}
              className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:shadow-md transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => onDuplicate(question)}
              className="p-2 rounded-lg hover:bg-background transition-colors"
              title="Duplicate"
            >
              📋
            </button>
            <button
              onClick={() => onDelete(question.id)}
              className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
              title="Delete"
            >
              <TrashIcon size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
