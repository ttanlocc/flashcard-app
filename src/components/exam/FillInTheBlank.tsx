'use client';

import { useState } from 'react';
import { ExamPart, FillInBlankQuestion } from '@/types/types';

interface FillInTheBlankProps {
  part: ExamPart;
  userAnswers: { [questionId: string]: any };
  onAnswerChange: (questionId: string, answer: any) => void;
}

export const FillInTheBlank = ({ part, userAnswers, onAnswerChange }: FillInTheBlankProps) => {

  const handleInputChange = (questionId: string, value: string) => {
    onAnswerChange(questionId, value);
  };

  const questions = part.questions as FillInBlankQuestion[];

  return (
    <div className="mb-8">
      <h3 className="mb-2 text-xl font-bold">{part.title}</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{part.description}</p>

      {part.wordBank && (
        <div className="mb-6 flex flex-wrap gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-gray-600">
          {part.wordBank.map((word) => (
            <span
              key={word}
              className="cursor-pointer rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {word.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q, index) => {
          const parts = q.question.split('__________');
          return (
            <div key={q.id} className="flex items-center gap-2">
              <span className="font-semibold">{index + 1}.</span>
              <p className="flex items-center gap-2">
                <span>{parts[0]}</span>
                <input
                  type="text"
                  value={userAnswers[q.id] || ''}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  className="inline-block w-48 rounded-md border-gray-300 bg-white px-2 py-1 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <span>{parts[1]}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 