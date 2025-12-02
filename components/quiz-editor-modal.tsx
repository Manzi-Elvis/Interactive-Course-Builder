"use client"

import { XIcon, PlusIcon, TrashIcon } from "./simple-icons"
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

interface QuizEditorModalProps {
  isOpen: boolean
  question?: QuizQuestion
  onClose: () => void
  onSave: (question: QuizQuestion) => void
}

export function QuizEditorModal({ isOpen, question, onClose, onSave }: QuizEditorModalProps) {
  const [title, setTitle] = useState(question?.title || "")
  const [type, setType] = useState<QuizQuestion["type"]>(question?.type || "multiple-choice")
  const [options, setOptions] = useState<QuestionOption[]>(
    question?.options || [
      { id: "1", text: "Option 1", isCorrect: true },
      { id: "2", text: "Option 2", isCorrect: false },
    ],
  )
  const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer || "")

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a question title")
      return
    }

    const newQuestion: QuizQuestion = {
      id: question?.id || Math.random().toString(36).substr(2, 9),
      title,
      type,
      options: type !== "short-answer" ? options : undefined,
      correctAnswer: type === "short-answer" ? correctAnswer : undefined,
    }

    onSave(newQuestion)
    onClose()
  }

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        id: Math.random().toString(36).substr(2, 9),
        text: `Option ${options.length + 1}`,
        isCorrect: false,
      },
    ])
  }

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter((opt) => opt.id !== id))
  }

  const handleToggleCorrect = (id: string) => {
    if (type === "true-false") {
      setOptions(options.map((opt) => ({ ...opt, isCorrect: opt.id === id })))
    } else {
      setOptions(options.map((opt) => (opt.id === id ? { ...opt, isCorrect: !opt.isCorrect } : opt)))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-xl font-bold">{question ? "Edit" : "Create"} Question</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Question title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Question</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your question..."
              rows={2}
              className="input-field resize-none"
            />
          </div>

          {/* Question type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Question Type</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "multiple-choice", label: "Multiple Choice" },
                { value: "true-false", label: "True/False" },
                { value: "short-answer", label: "Short Answer" },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    setType(t.value as QuizQuestion["type"])
                    if (t.value === "true-false") {
                      setOptions([
                        { id: "1", text: "True", isCorrect: true },
                        { id: "2", text: "False", isCorrect: false },
                      ])
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    type === t.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options (for multiple choice and true/false) */}
          {type !== "short-answer" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-foreground">Options</label>
                {type === "multiple-choice" && (
                  <button
                    onClick={handleAddOption}
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <PlusIcon size={16} />
                    Add Option
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleCorrect(option.id)}
                      className={`shrink-0 w-5 h-5 rounded border-2 transition-all ${
                        option.isCorrect ? "bg-green-500 border-green-600" : "border-border hover:border-green-500"
                      }`}
                    />
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => {
                        setOptions(
                          options.map((opt) => (opt.id === option.id ? { ...opt, text: e.target.value } : opt)),
                        )
                      }}
                      className="input-field flex-1"
                      disabled={type === "true-false"}
                    />
                    {type === "multiple-choice" && (
                      <button
                        onClick={() => handleRemoveOption(option.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                      >
                        <TrashIcon size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correct answer (for short answer) */}
          {type === "short-answer" && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Accepted Answer</label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter the correct answer"
                className="input-field"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex gap-3 justify-end p-6 border-t border-border bg-card">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save Question
          </button>
        </div>
      </div>
    </div>
  )
}
