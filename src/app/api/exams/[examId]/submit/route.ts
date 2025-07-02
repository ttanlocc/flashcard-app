import { NextRequest, NextResponse } from 'next/server';
import { unit1Exam } from '@/data/exams/unit1';
import { Exam, UserAnswer, Question, MatchingPair } from '@/types/types';

const exams: Record<string, Exam> = {
  'UNIT1-EXAM-001': unit1Exam,
};

type ResultCorrectAnswer = string | string[] | MatchingPair[] | null | undefined;
interface ResultDetail {
  questionId: string;
  correct: boolean;
  userAnswer: UserAnswer['answer'] | null;
  correctAnswer: ResultCorrectAnswer;
  correctMatches?: number;
  totalMatches?: number;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    const { examId } = params;
    const body = await req.json();
    const userAnswers: UserAnswer[] = body.answers;

    const exam = exams[examId];

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    let score = 0;
    const results: ResultDetail[] = [];
    let totalPoints = 0;

    exam.parts.forEach((part) => {
      // All questions in a part are of the same type.
      // So we can check part.type
      const questions = part.questions as Question[]; // Cast to general Question to iterate
      questions.forEach((question) => {
        const userAnswer = userAnswers.find((ans) => ans.questionId === question.id);

        let isCorrect = false;
        let correctAnswer: ResultCorrectAnswer = null;

        switch (part.type) {
          case 'fill_in_blank': {
            totalPoints++;
            const q = question as import('@/types/types').FillInBlankQuestion;
            correctAnswer = q.answer;
            if (userAnswer) {
              isCorrect = q.answer.includes(userAnswer.answer as string);
            }
            break;
          }
          case 'multiple_choice': {
            totalPoints++;
            const q = question as import('@/types/types').MultipleChoiceQuestion;
            correctAnswer = q.answer;
            if (userAnswer) {
              isCorrect = q.answer === userAnswer.answer;
            }
            break;
          }
          case 'matching': {
            const q = question as import('@/types/types').MatchingQuestion;
            const correctPairs = q.pairs || [];
            correctAnswer = correctPairs;
            totalPoints += correctPairs.length;
            let correctMatches = 0;

            if (userAnswer && Array.isArray(userAnswer.answer)) {
              const userMatches = userAnswer.answer as { item: string, match: string }[];
              userMatches.forEach(userPair => {
                const correctPair = correctPairs.find(p => p.item === userPair.item);
                if (correctPair && correctPair.match === userPair.match) {
                  correctMatches++;
                }
              });
            }
            score += correctMatches; // Add matches to score

            results.push({
              questionId: question.id,
              correct: correctMatches === correctPairs.length,
              userAnswer: userAnswer ? userAnswer.answer : null,
              correctAnswer: correctPairs,
              correctMatches,
              totalMatches: correctPairs.length,
            });
            return; // Use return to skip common result push
          }
          case 'sentence_writing': {
            totalPoints++;
            const q = question as import('@/types/types').SentenceWritingQuestion;
            correctAnswer = q.example || `A sentence using "${q.prompt}"`;
            if (userAnswer && typeof userAnswer.answer === 'string') {
               // For now, let's just check if the prompt word is in the sentence.
              isCorrect = userAnswer.answer.toLowerCase().includes(q.prompt.toLowerCase());
            }
            break;
          }
        }

        if (isCorrect) {
          score++;
        }

        results.push({
          questionId: question.id,
          correct: isCorrect,
          userAnswer: userAnswer ? userAnswer.answer : null,
          correctAnswer: correctAnswer,
        });
      });
    });

    return NextResponse.json({
      score,
      totalPoints,
      results,
    });
  } catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
} 