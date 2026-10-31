'use client';

import React, { useState } from 'react';
import MathRenderer from './math-renderer';
import { Button } from '@/components/ui/button';

export interface QuizQuestionData {
  id: string;
  question_md: string;
  answers: {
    id: string;
    answer_text: string;
    is_correct: boolean;
    explanation_md: string | null;
  }[];
}

interface QuizViewProps {
  quizTitle: string;
  questions: QuizQuestionData[];
}

export default function QuizView({ quizTitle, questions }: QuizViewProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  function handleSelect(questionId: string, answerId: string) {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleReset() {
    setSelectedAnswers({});
    setSubmitted(false);
  }

  // Calculate score
  let score = 0;
  questions.forEach((q) => {
    const chosenId = selectedAnswers[q.id];
    const correct = q.answers.find((a) => a.is_correct);
    if (chosenId && correct && chosenId === correct.id) {
      score += 1;
    }
  });

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-6 shadow-sm space-y-6">
      <div className="border-b border-navy/10 pb-4">
        <h3 className="text-xl font-bold text-navy flex items-center gap-2">
          <span>🎯</span> {quizTitle}
        </h3>
        <p className="text-sm text-text/70 mt-1">
          Teste ta compréhension de la leçon avec ce quiz interactif.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const chosenAnswerId = selectedAnswers[q.id];
          const correctAnswer = q.answers.find((a) => a.is_correct);

          return (
            <div
              key={q.id}
              className="rounded-xl border border-navy/10 p-4 bg-surface/30 space-y-3"
            >
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-navy/10 text-navy font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <div className="flex-1 font-medium text-navy text-sm">
                  <MathRenderer content={q.question_md} />
                </div>
              </div>

              {/* Answers */}
              <div className="space-y-2 pl-8">
                {q.answers.map((ans) => {
                  const isSelected = chosenAnswerId === ans.id;
                  let btnStyle = 'border-navy/15 bg-white hover:border-turquoise/50 text-text';

                  if (submitted) {
                    if (ans.is_correct) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (isSelected && !ans.is_correct) {
                      btnStyle = 'border-coral bg-coral/10 text-coral font-medium';
                    } else {
                      btnStyle = 'border-navy/10 bg-white/50 text-text/50';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-turquoise bg-turquoise/10 text-navy font-semibold ring-1 ring-turquoise';
                  }

                  return (
                    <button
                      key={ans.id}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, ans.id)}
                      className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{ans.answer_text}</span>
                      {submitted && ans.is_correct && (
                        <span className="text-emerald-600 font-bold text-xs shrink-0">✓ Correct</span>
                      )}
                      {submitted && isSelected && !ans.is_correct && (
                        <span className="text-coral font-bold text-xs shrink-0">✗ Faux</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {submitted && correctAnswer?.explanation_md && (
                <div className="ml-8 mt-2 p-3 rounded-lg bg-white border border-navy/10 text-xs text-text/80">
                  <p className="font-semibold text-navy mb-1">Explication :</p>
                  <MathRenderer content={correctAnswer.explanation_md} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer controls & score */}
      <div className="pt-4 border-t border-navy/10 flex flex-wrap items-center justify-between gap-4">
        {!submitted ? (
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length === 0}
          >
            Valider mes réponses ({Object.keys(selectedAnswers).length}/{total})
          </Button>
        ) : (
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold ${percentage >= 70 ? 'text-emerald-600' : percentage >= 50 ? 'text-gold' : 'text-coral'}`}>
                {score} / {total}
              </span>
              <span className="text-sm text-text/75">
                ({percentage}%) — {percentage >= 70 ? 'Excellent travail ! 🎉' : percentage >= 50 ? 'Bien compris, continue ! 👍' : 'Revois la leçon et réessaie ! 💪'}
              </span>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
              Recommencer le quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

