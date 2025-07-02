export interface Flashcard {
  Unit: string;
  'Từ vựng': string;
  'Nghĩa tiếng Việt': string;
  'Định nghĩa tiếng Anh': string;
  'Từ loại': string;
}

export type QuestionType = 'fill_in_blank' | 'multiple_choice' | 'matching' | 'sentence_writing';

interface BaseQuestion {
  id: string;
}

export interface FillInBlankQuestion extends BaseQuestion {
  question: string;
  answer: string[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface MatchingPair {
  item: string;
  match: string;
}

export interface MatchingQuestion extends BaseQuestion {
  pairs: MatchingPair[];
}

export interface SentenceWritingQuestion extends BaseQuestion {
  prompt: string;
  example?: string;
}

export type Question =
  | FillInBlankQuestion
  | MultipleChoiceQuestion
  | MatchingQuestion
  | SentenceWritingQuestion;

export interface ExamPart {
  title: string;
  description: string;
  type: QuestionType;
  wordBank?: string[];
  questions:
    | FillInBlankQuestion[]
    | MultipleChoiceQuestion[]
    | MatchingQuestion[]
    | SentenceWritingQuestion[];
}

export interface Exam {
  id: string;
  title: string;
  parts: ExamPart[];
}

export interface UserAnswer {
  questionId: string;
  answer: any;
} 