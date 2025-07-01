'use client';

import { useState, useEffect } from 'react';
import { Flashcard } from '@/types/types';

const FlipCard = ({ card, isFlipped, onClick }: { card: Flashcard; isFlipped: boolean; onClick: () => void }) => {
  return (
    <div className="h-64 w-full [perspective:1000px]" onClick={onClick}>
      <div
        className={`relative h-full w-full cursor-pointer rounded-2xl shadow-lg transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front of the card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gray-800/80 p-6 text-center [backface-visibility:hidden] dark:bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-gray-100 sm:text-3xl dark:text-gray-100">{card['Từ vựng']}</h2>
          <p className="text-md italic text-gray-400 sm:text-lg dark:text-gray-400">({card['Từ loại']})</p>
        </div>
        {/* Back of the card */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-gray-900 px-6 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] sm:px-12 dark:bg-black">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h3 className="text-xl font-bold sm:text-2xl">{card['Nghĩa tiếng Việt']}</h3>
            <p className="mt-2 text-sm sm:text-base">{card['Định nghĩa tiếng Anh']}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export const FlashcardViewer = ({ flashcards }: { flashcards: Flashcard[] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const totalPages = flashcards.length;
  const currentCard = flashcards[currentPage];
  
  const progressPercentage = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

  useEffect(() => {
    setIsFlipped(false);
  }, [currentPage]);

  const handleCardFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div className="flex w-full max-w-xl items-center justify-center gap-2 px-4 sm:gap-4">
       <button
        onClick={goToPreviousPage}
        disabled={currentPage === 0}
        className="rounded-full bg-gray-800 p-3 text-white shadow-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        aria-label="Previous Card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="flex w-full max-w-md flex-col items-center sm:max-w-lg">
        <div className="w-full min-h-[16rem] flex items-center justify-center">
          {currentCard && (
            <FlipCard
              key={currentCard['Từ vựng']}
              card={currentCard}
              isFlipped={isFlipped}
              onClick={handleCardFlip}
            />
          )}
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentPage + 1} / {totalPages}
          </span>
          <div className="w-full max-w-xs h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-1.5 rounded-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
          </div>
        </div>
      </div>
      
      <button
        onClick={goToNextPage}
        disabled={currentPage >= totalPages - 1}
        className="rounded-full bg-gray-800 p-3 text-white shadow-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        aria-label="Next Card"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}; 