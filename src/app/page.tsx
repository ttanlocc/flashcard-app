import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Flashcard } from '@/types/types';
import { FlashcardApp } from '@/components/FlashcardApp';

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
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <FlashcardApp flashcards={flashcards} />
    </main>
  );
}
