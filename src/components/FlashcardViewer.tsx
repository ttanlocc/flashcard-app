'use client';

import { useState, useEffect } from 'react';
import { Flashcard } from '@/types/types';

const FlipCard = ({ card, isFlipped, onClick }: { card: Flashcard; isFlipped: boolean; onClick: () => void }) => {
  return (
    <div className="h-64 w-96 [perspective:1000px]" onClick={onClick}>
      <div
        className={`relative h-full w-full cursor-pointer rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front of the card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white p-6 text-center shadow-md [backface-visibility:hidden]">
          <h2 className="mb-2 text-3xl font-bold text-gray-800">{card['Từ vựng']}</h2>
          <p className="text-lg italic text-gray-500">({card['Từ loại']})</p>
        </div>
        {/* Back of the card */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-gray-800 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">{card['Nghĩa tiếng Việt']}</h3>
            <p className="mt-2 text-base">{card['Định nghĩa tiếng Anh']}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export const FlashcardViewer = ({ flashcards }: { flashcards: Flashcard[] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flippedStates, setFlippedStates] = useState([false, false]);

  const cardsPerPage = 2;
  const totalPages = Math.ceil(flashcards.length / cardsPerPage);
  const currentCards = flashcards.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  useEffect(() => {
    setFlippedStates(new Array(currentCards.length).fill(false));
  }, [currentPage, currentCards.length]);

  const handleCardFlip = (index: number) => {
    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center">
      <div className="mb-8 grid min-h-[16rem] grid-cols-1 items-center gap-8 md:grid-cols-2">
        {currentCards.map((card, index) => (
          <FlipCard
            key={card['Từ vựng']}
            card={card}
            isFlipped={flippedStates[index]}
            onClick={() => handleCardFlip(index)}
          />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="rounded-lg bg-gray-800 px-6 py-2 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium text-gray-700">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className="rounded-lg bg-gray-800 px-6 py-2 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 