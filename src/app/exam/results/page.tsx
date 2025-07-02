'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MatchingPair, UserAnswerPayload } from '@/types/types';

interface Result {
  questionId: string;
  correct: boolean;
  userAnswer: UserAnswerPayload | null;
  correctAnswer: string | string[] | MatchingPair[] | null;
  correctMatches?: number;
  totalMatches?: number;
}

interface ExamResults {
  score: number;
  totalPoints: number;
  results: Result[];
}

const ResultsPage = () => {
  const [results, setResults] = useState<ExamResults | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('examResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
      // Optional: clear the storage after reading
      // sessionStorage.removeItem('examResults'); 
    } else {
      // Handle case where there are no results, e.g., redirect
      // router.push('/'); 
    }
  }, [router]);

  if (!results) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Đang tải kết quả...</p>
      </div>
    );
  }

  const { score, totalPoints, results: detailedResults } = results;

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-800 dark:text-gray-100">Kết quả bài kiểm tra</h1>
        <p className="mb-6 text-center text-xl text-gray-600 dark:text-gray-300">
          Điểm của bạn: <span className="font-bold text-blue-600">{score}</span> / {totalPoints}
        </p>

        <div className="space-y-6">
          {detailedResults.map((result) => (
            <div key={result.questionId} className={`rounded-lg p-4 ${result.correct ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Câu hỏi ID: {result.questionId}</p>
              <p>Câu trả lời của bạn: <span className="font-mono text-sm">{JSON.stringify(result.userAnswer)}</span></p>
              {!result.correct && (
                <p>Đáp án đúng: <span className="font-mono text-sm">{JSON.stringify(result.correctAnswer)}</span></p>
              )}
               {result.totalMatches && (
                <p>Số câu đúng: {result.correctMatches}/{result.totalMatches}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage; 