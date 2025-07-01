import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Flashcard } from '@/types/types';
import { FlashcardViewer } from '@/components/FlashcardViewer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

async function getFlashcards(): Promise<Flashcard[]> {
  const csvFilePath = path.join(process.cwd(), 'src', 'data', 'flashcards.csv');
  const csvFile = fs.readFileSync(csvFilePath, 'utf8');

  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data as Flashcard[]);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

export default async function HomePage() {
  const flashcards = await getFlashcards();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8 dark:bg-gray-900">
      <ThemeSwitcher />
      <h1 className="mb-12 text-center text-4xl font-extrabold text-gray-800 sm:text-5xl dark:text-gray-100">
        Vietnamese Flashcards
      </h1>
      <FlashcardViewer flashcards={flashcards} />
    </main>
  );
}
