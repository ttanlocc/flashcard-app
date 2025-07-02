'use client';

import { useState } from 'react';
import { ExamPart, MultipleChoiceQuestion } from '@/types/types';

interface MultipleChoiceProps {
  part: ExamPart;
  userAnswers: { [questionId: string]: any };
  onAnswerChange: (questionId: string, answer: any) => void;
}

export const MultipleChoice = ({ part, userAnswers, onAnswerChange }: MultipleChoiceProps) => {

  const handleOptionChange = (questionId: string, option: string) => {
    onAnswerChange(questionId, option);
  };

  const questions = part.questions as MultipleChoiceQuestion[];

  return (
    <div className="mb-8">
      <h3 className="mb-2 text-xl font-bold">{part.title}</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{part.description}</p>
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id}>
            <p className="mb-2 font-semibold">
              {index + 1}. <span dangerouslySetInnerHTML={{ __html: q.question }} />
            </p>
            <div className="flex flex-col gap-2 pl-6">
              {q.options.map((option) => (
                <label key={option} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    checked={userAnswers[q.id] === option}
                    onChange={() => handleOptionChange(q.id, option)}
                    className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 