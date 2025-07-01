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
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center [backface-visibility:hidden] dark:bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-100">{card['Từ vựng']}</h2>
          <p className="text-md italic text-gray-500 sm:text-lg dark:text-gray-400">({card['Từ loại']})</p>
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
    <div className="flex w-full max-w-md flex-col items-center px-4 sm:max-w-lg">
      <div className="mb-8 w-full min-h-[16rem] flex items-center justify-center">
        {currentCard && (
          <FlipCard
            key={currentCard['Từ vựng']}
            card={currentCard}
            isFlipped={isFlipped}
            onClick={handleCardFlip}
          />
        )}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="rounded-full bg-gray-800 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className="rounded-full bg-gray-800 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 