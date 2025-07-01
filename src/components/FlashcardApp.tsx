'use client';

import { useState, useMemo } from 'react';
import { Flashcard } from '@/types/types';
import { FlashcardViewer } from '@/components/FlashcardViewer';
import { ListView } from '@/components/ListView';

type ViewMode = 'card' | 'list';

const Controls = ({
  view,
  setView,
  units,
  selectedUnit,
  setSelectedUnit,
}: {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  units: string[];
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
}) => {
  return (
    <div className="mb-8 flex w-full max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
      {/* View Switcher - moved to left */}
      <div className="rounded-full bg-gray-200 p-1 dark:bg-gray-700">
        <button
          onClick={() => setView('card')}
          className={`w-24 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            view === 'card'
              ? 'bg-white text-gray-900 shadow-md dark:bg-gray-500 dark:text-gray-100'
              : 'text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Card
        </button>
        <button
          onClick={() => setView('list')}
          className={`w-24 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            view === 'list'
              ? 'bg-white text-gray-900 shadow-md dark:bg-gray-500 dark:text-gray-100'
              : 'text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          List
        </button>
      </div>

      {/* Unit Switcher */}
      <div className="relative">
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="w-64 appearance-none rounded-full bg-white px-5 py-3 pr-8 text-center font-semibold text-gray-900 shadow-md transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-300">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};

export const FlashcardApp = ({ flashcards }: { flashcards: Flashcard[] }) => {
  const [view, setView] = useState<ViewMode>('card');

  const units = useMemo(() => {
    if (!flashcards) return [];
    const unitSet = new Set(flashcards.map((card) => card.Unit).filter(Boolean));
    return Array.from(unitSet);
  }, [flashcards]);

  const [selectedUnit, setSelectedUnit] = useState<string>('');

  useMemo(() => {
    if (units.length > 0 && !selectedUnit) {
      setSelectedUnit(units[0]);
    }
  }, [units, selectedUnit]);

  const filteredFlashcards = useMemo(() => {
    if (!flashcards) return [];
    return flashcards.filter((card) => card.Unit === selectedUnit);
  }, [flashcards, selectedUnit]);

  if (units.length === 0) {
    return <div className="dark:text-white">Loading or no data available...</div>;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <Controls
        view={view}
        setView={setView}
        units={units}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
      />
      {view === 'card' ? (
        <FlashcardViewer flashcards={filteredFlashcards} />
      ) : (
        <ListView flashcards={filteredFlashcards} />
      )}
    </div>
  );
}; 