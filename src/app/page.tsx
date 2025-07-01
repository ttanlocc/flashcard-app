import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Flashcard } from '@/types/types';

const FlipCard = ({ card }: { card: Flashcard }) => {
  return (
    <div className="group h-64 w-96 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white p-6 text-center shadow-md">
          <h2 className="mb-2 text-3xl font-bold">{card['Từ vựng']}</h2>
          <p className="text-lg italic text-gray-500">({card['Từ loại']})</p>
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">{card['Nghĩa tiếng Việt']}</h3>
            <p className="mt-2 text-base">{card['Định nghĩa tiếng Anh']}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

async function getFlashcards(): Promise<Flashcard[]> {
  const csvFilePath = path.join(process.cwd(), 'src', 'data', 'flashcards.csv');
  const csvFile = fs.readFileSync(csvFilePath, 'utf8');

  return new Promise((resolve) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        resolve(results.data as Flashcard[]);
      },
    });
  });
}

export default async function HomePage() {
  const flashcards = await getFlashcards();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="mb-12 text-5xl font-extrabold text-gray-800">Vietnamese Flashcards</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {flashcards.filter(card => card['Từ vựng']).map((card, index) => (
          <FlipCard key={index} card={card} />
        ))}
      </div>
    </main>
  );
}
