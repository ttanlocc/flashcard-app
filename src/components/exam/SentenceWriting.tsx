'use client';

import { useState } from 'react';
import { ExamPart, SentenceWritingQuestion } from '@/types/types';

interface SentenceWritingProps {
  part: ExamPart;
  userAnswers: { [questionId: string]: any };
  onAnswerChange: (questionId: string, answer: any) => void;
}

export const SentenceWriting = ({ part, userAnswers, onAnswerChange }: SentenceWritingProps) => {

  const handleTextChange = (questionId: string, text: string) => {
    onAnswerChange(questionId, text);
  };

  const questions = part.questions as SentenceWritingQuestion[];

  return (
    <div className="mb-8">
      <h3 className="mb-2 text-xl font-bold">{part.title}</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{part.description}</p>
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id}>
            <div className="mb-2 flex items-baseline gap-2">
              <p className="font-semibold">{q.prompt}</p>
              <p className="text-sm text-gray-500">
                👉 Ví dụ: <em>{q.example}</em>
              </p>
            </div>
            <textarea
              value={userAnswers[q.id] || ''}
              onChange={(e) => handleTextChange(q.id, e.target.value)}
              rows={3}
              className="w-full rounded-md border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Viết câu của bạn ở đây..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}; 