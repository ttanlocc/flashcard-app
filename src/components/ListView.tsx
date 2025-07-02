import { Flashcard } from '@/types/types';

export const ListView = ({ flashcards }: { flashcards: Flashcard[] }) => {
  return (
    <div className="w-full max-w-4xl rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800 sm:p-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full text-left text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Từ vựng
              </th>
              <th scope="col" className="px-4 py-3">
                Từ loại
              </th>
              <th scope="col" className="px-4 py-3">
                Nghĩa tiếng Việt
              </th>
              <th scope="col" className="hidden px-4 py-3 md:table-cell">
                Định nghĩa tiếng Anh
              </th>
            </tr>
          </thead>
          <tbody>
            {flashcards.map((card) => (
              <tr
                key={card['Từ vựng']}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {card['Từ vựng']}
                </th>
                <td className="px-4 py-4 italic">{card['Từ loại']}</td>
                <td className="px-4 py-4">{card['Nghĩa tiếng Việt']}</td>
                <td className="hidden px-4 py-4 md:table-cell">
                  {card['Định nghĩa tiếng Anh']}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 