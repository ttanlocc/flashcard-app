'use client';

import { useState } from 'react';
import { Flashcard } from '@/types/types';
import { FlashcardViewer } from '@/components/FlashcardViewer';
import { ListView } from '@/components/ListView';

type ViewMode = 'card' | 'list';

const ViewSwitcher = ({ view, setView }: { view: ViewMode; setView: (view: ViewMode) => void }) => {
  return (
    <div className="mb-8 flex justify-center rounded-md bg-gray-200 p-1 dark:bg-gray-700">
      <button
        onClick={() => setView('card')}
        className={`w-24 rounded px-4 py-2 text-sm font-semibold transition-colors ${
          view === 'card'
            ? 'bg-white text-gray-900 shadow dark:bg-gray-500 dark:text-gray-100'
            : 'text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Card
      </button>
      <button
        onClick={() => setView('list')}
        className={`w-24 rounded px-4 py-2 text-sm font-semibold transition-colors ${
          view === 'list'
            ? 'bg-white text-gray-900 shadow dark:bg-gray-500 dark:text-gray-100'
            : 'text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        List
      </button>
    </div>
  );
};

export const FlashcardApp = ({ flashcards }: { flashcards: Flashcard[] }) => {
  const [view, setView] = useState<ViewMode>('card');

  return (
    <>
      <ViewSwitcher view={view} setView={setView} />
      {view === 'card' ? (
        <FlashcardViewer flashcards={flashcards} />
      ) : (
        <ListView flashcards={flashcards} />
      )}
    </>
  );
}; 