'use client';

import { ExamPart, MatchingQuestion } from '@/types/types';

type MatchingAnswer = Record<string, string>;

interface MatchingProps {
  part: ExamPart;
  userAnswers: { [questionId: string]: unknown };
  onAnswerChange: (questionId: string, answer: MatchingAnswer) => void;
}

export const Matching = ({ part, userAnswers, onAnswerChange }: MatchingProps) => {
  const question = part.questions[0] as MatchingQuestion;

  const handleSelectChange = (item: string, value: string) => {
    const currentAnswers = (userAnswers[question.id] as MatchingAnswer) || {};
    const newAnswers = { ...currentAnswers, [item]: value };
    onAnswerChange(question.id, newAnswers);
  };

  const items = question.pairs.map((p) => p.item);
  const options = question.pairs.map((p) => p.match);
  const currentSelection = (userAnswers[question.id] as MatchingAnswer) || {};

  return (
    <div className="mb-8">
      <h3 className="mb-2 text-xl font-bold">{part.title}</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{part.description}</p>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {/* Column A */}
        <div className="font-semibold">Cột A</div>
        <div className="font-semibold">Cột B</div>

        {items.map((item, index) => (
          <div key={index} className="contents">
            <div className="flex items-center rounded-md bg-gray-100 p-3 dark:bg-gray-700">
              {item}
            </div>
            <div className="flex items-center">
              <select
                value={currentSelection[item] || ''}
                onChange={(e) => handleSelectChange(item, e.target.value)}
                className="w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="" disabled>
                  Chọn đáp án...
                </option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 