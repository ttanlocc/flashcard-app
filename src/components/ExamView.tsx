'use client';

import { useState } from 'react';
import { unit1Exam } from '@/data/exams/unit1';
import { Exam, ExamPart } from '@/types/types';
import { FillInTheBlank } from './exam/FillInTheBlank';
import { MultipleChoice } from './exam/MultipleChoice';
import { Matching } from './exam/Matching';
import { SentenceWriting } from './exam/SentenceWriting';

const renderExamPart = (part: ExamPart) => {
  switch (part.type) {
    case 'fill_in_blank':
      return <FillInTheBlank key={part.title} part={part} />;
    case 'multiple_choice':
      return <MultipleChoice key={part.title} part={part} />;
    case 'matching':
      return <Matching key={part.title} part={part} />;
    case 'sentence_writing':
      return <SentenceWriting key={part.title} part={part} />;
    default:
      return null;
  }
};

export const ExamView = () => {
  const [examCode, setExamCode] = useState('');
  const [exam, setExam] = useState<Exam | null>(null);
  const [error, setError] = useState('');
  const [currentPart, setCurrentPart] = useState(0);

  const handleStartExam = () => {
    if (examCode === unit1Exam.id) {
      setExam(unit1Exam);
      setError('');
    } else {
      setExam(null);
      setError('Mã bài kiểm tra không hợp lệ.');
    }
  };

  const handleNext = () => {
    if (exam && currentPart < exam.parts.length - 1) {
      setCurrentPart(currentPart + 1);
    }
  };

  const handlePrev = () => {
    if (currentPart > 0) {
      setCurrentPart(currentPart - 1);
    }
  };

  if (exam) {
    const progress = ((currentPart + 1) / exam.parts.length) * 100;
    return (
      <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-6 border-b pb-4 dark:border-gray-600">
          <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
            {exam.title}
          </h1>
          <div className="mt-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
              style={{ width: `${progress}%` }}
            >
              {`${Math.round(progress)}%`}
            </div>
          </div>
        </div>
        <div>{renderExamPart(exam.parts[currentPart])}</div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentPart === 0}
            className="rounded-full bg-gray-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Quay lại
          </button>
          {currentPart < exam.parts.length - 1 ? (
            <button
              onClick={handleNext}
              className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tiếp theo
            </button>
          ) : (
            <button className="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Nộp bài
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
        Bắt đầu bài kiểm tra
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={examCode}
          onChange={(e) => setExamCode(e.target.value)}
          placeholder="Nhập mã bài kiểm tra"
          className="rounded-full border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
        <button
          onClick={handleStartExam}
          className="rounded-full bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Bắt đầu
        </button>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};