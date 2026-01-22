"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, XCircle, CheckCircle } from "lucide-react"

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string | number
}

export interface QuizData {
  title: string
  questions: QuizQuestion[]
}

interface QuizProps {
  setScore: CallableFunction
  quizData: QuizData
  showAnswersImmediately?: boolean
  userAnswers?: Record<number, number>
  onAnswerChange?: (answers: Record<number, number>) => void
}

export default function Quiz({
  setScore,
  quizData, 
  showAnswersImmediately = false,
  userAnswers,
  onAnswerChange
}: QuizProps) {
  const [internalAnswers, setInternalAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(showAnswersImmediately)
  
  // Use controlled answers if provided, otherwise use internal state
  const selectedAnswers = userAnswers !== undefined ? userAnswers : internalAnswers
  
  const setSelectedAnswers = (answers: Record<number, number> | ((prev: Record<number, number>) => Record<number, number>)) => {
    if (onAnswerChange) {
      const newAnswers = typeof answers === 'function' ? answers(userAnswers || {}) : answers
      onAnswerChange(newAnswers)
    } else {
      if (typeof answers === 'function') {
        setInternalAnswers(answers)
      } else {
        setInternalAnswers(answers)
      }
    }
  }

  // Show results when showAnswersImmediately is true
  useEffect(() => {
    if (showAnswersImmediately) {
      setShowResults(true)
    }
  }, [showAnswersImmediately])

  const handleOptionSelect = (questionIndex: number, option: string, optionIndex: number) => {
    if (showResults) return // Don't allow changes after submitting
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }))
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const getScore = () => {
    let correct = 0
    quizData.questions.forEach((q, index) => {
      const selected = selectedAnswers[index]
      const correctAnswer = typeof q.correctAnswer === 'number' 
        ? q.correctAnswer 
        : q.options.indexOf(q.correctAnswer)
      
      if (selected === correctAnswer) {
        correct++
      }
    })
    if (correct && quizData.questions)
      setScore(Math.round((correct / quizData.questions.length) * 100))
    return { correct, total: quizData.questions.length }
  }

  const isOptionCorrect = (questionIndex: number, optionIndex: number) => {
    if (!showResults) return false
    const question = quizData.questions[questionIndex]
    const correctAnswer = typeof question.correctAnswer === 'number' 
      ? question.correctAnswer 
      : question.options.indexOf(question.correctAnswer)
    return optionIndex === correctAnswer
  }

  const getCorrectAnswerIndex = (questionIndex: number) => {
    const question = quizData.questions[questionIndex]
    return typeof question.correctAnswer === 'number' 
      ? question.correctAnswer 
      : question.options.indexOf(question.correctAnswer)
  }

  const isOptionSelected = (questionIndex: number, optionIndex: number) => {
    return selectedAnswers[questionIndex] === optionIndex
  }

  const isOptionWrong = (questionIndex: number, optionIndex: number) => {
    if (!showResults) return false
    const question = quizData.questions[questionIndex]
    const correctAnswer = typeof question.correctAnswer === 'number' 
      ? question.correctAnswer 
      : question.options.indexOf(question.correctAnswer)
    return isOptionSelected(questionIndex, optionIndex) && optionIndex !== correctAnswer
  }

  const score = showResults ? getScore() : null

  const allAnswered = Object.keys(selectedAnswers).length === quizData.questions.length

  return (
    <div className="quiz-container space-y-6">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {quizData.title}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {quizData.questions.length} questions
        </p>
      </div>

      <div className="space-y-8">
        {quizData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-0.5">
                {questionIndex + 1}.
              </span>
              <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100 flex-1">
                {question.question}
              </h3>
            </div>
            
            <div className="ml-6 space-y-2">
              {question.options.map((option, optionIndex) => {
                const correctAnswerIndex = getCorrectAnswerIndex(questionIndex)
                const isCorrect = isOptionCorrect(questionIndex, optionIndex)
                const isWrong = isOptionWrong(questionIndex, optionIndex)
                const isSelected = isOptionSelected(questionIndex, optionIndex)
                const isCorrectAnswer = optionIndex === correctAnswerIndex
                // Show correct answer if showAnswersImmediately is true
                const showAsCorrect = showAnswersImmediately && isCorrectAnswer && showResults
                
                return (
                  <button
                    key={optionIndex}
                    onClick={() => handleOptionSelect(questionIndex, option, optionIndex)}
                    disabled={showResults}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg border-2 transition-all
                      ${isSelected && !showResults 
                        ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800' 
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }
                      ${(isCorrect && showResults) || showAsCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                        : ''
                      }
                      ${isWrong && showResults 
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                        : ''
                      }
                      ${showResults ? 'cursor-default' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${isSelected 
                          ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100' 
                          : 'border-zinc-300 dark:border-zinc-600'
                        }
                        ${(isCorrect && showResults) || showAsCorrect
                          ? 'border-green-500 bg-green-500' 
                          : ''
                        }
                        ${isWrong && showResults 
                          ? 'border-red-500 bg-red-500' 
                          : ''
                        }
                      `}>
                        {((isCorrect && showResults) || showAsCorrect) && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                        {isWrong && showResults && (
                          <XCircle className="w-3 h-3 text-white" />
                        )}
                        {isSelected && !showResults && (
                          <div className="w-2 h-2 rounded-full bg-white dark:bg-zinc-900" />
                        )}
                      </div>
                      <span className={`
                        text-sm flex-1
                        ${(isCorrect && showResults) || showAsCorrect
                          ? 'text-green-700 dark:text-green-400 font-medium' 
                          : ''
                        }
                        ${isWrong && showResults 
                          ? 'text-red-700 dark:text-red-400' 
                          : ''
                        }
                        ${!showResults && isSelected 
                          ? 'text-zinc-900 dark:text-zinc-100 font-medium' 
                          : 'text-zinc-700 dark:text-zinc-300'
                        }
                      `}>
                        {option}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
        {showResults && score && (
          <div className="flex items-center gap-2">
            <div className={`
              px-4 py-2 rounded-lg font-semibold
              ${score.correct === score.total 
                ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400' 
                : score.correct >= score.total / 2 
                  ? 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400' 
                  : 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400'
              }
            `}>
              Score: {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
              
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Reset Quiz
            </button>
          </div>
        )}
        
        {!showResults && (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`
              px-6 py-2 rounded-lg font-medium transition-colors
              ${allAnswered 
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer' 
                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
              }
            `}
          >
            Submit Answers
          </button>
        )}
      </div>
    </div>
  )
}
