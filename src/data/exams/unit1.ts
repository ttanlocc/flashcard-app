import { Exam } from '@/types/types';

export const unit1Exam: Exam = {
  id: 'UNIT1-EXAM-001',
  title: 'Bài kiểm tra Unit 1',
  parts: [
    {
      title: 'Bài 1: Điền từ vào chỗ trống',
      description: 'Hãy chọn từ phù hợp trong bảng để điền vào chỗ trống.',
      type: 'fill_in_blank',
      wordBank: [
        'schedule',
        'delay',
        'on time',
        'confirm',
        'cancel',
        'urgent',
        'available',
        'reschedule',
        'appointment',
        'notice',
      ],
      questions: [
        {
          id: 'q1',
          question: 'I need to check my __________ to see if I am free.',
          answer: ['schedule'],
        },
        {
          id: 'q2',
          question: 'There was a __________ in our flight, so we arrived late.',
          answer: ['delay'],
        },
        {
          id: 'q3',
          question: 'It is important to be __________ for a job interview.',
          answer: ['on time'],
        },
        {
          id: 'q4',
          question: 'Please __________ your booking at least 24 hours in advance.',
          answer: ['confirm'],
        },
        {
          id: 'q5',
          question: 'They had to __________ the event due to bad weather.',
          answer: ['cancel'],
        },
        { id: 'q6', question: 'This is an __________ message, please respond immediately.', answer: ['urgent'] },
        {
          id: 'q7',
          question: "I'm sorry, the manager is not __________ at the moment.",
          answer: ['available'],
        },
        {
          id: 'q8',
          question: 'I would like to __________ my appointment to a later time.',
          answer: ['reschedule'],
        },
        { id: 'q9', question: 'She has an __________ with her lawyer tomorrow.', answer: ['appointment'] },
        {
          id: 'q10',
          question: "Did you receive the __________ about the office closure?",
          answer: ['notice'],
        },
      ],
    },
    {
      title: 'Bài 2: Chọn nghĩa đúng (Multiple Choice)',
      description: 'Chọn đáp án đúng nhất cho từ in đậm.',
      type: 'multiple_choice',
      questions: [
        {
          id: 'q11',
          question: 'The meeting is **on time**.',
          options: ['bị hủy', 'đúng giờ', 'bị trì hoãn', 'bị thay đổi'],
          answer: 'đúng giờ',
        },
        {
          id: 'q12',
          question: 'Please **confirm** your attendance.',
          options: ['hủy', 'xác nhận', 'trì hoãn', 'từ chối'],
          answer: 'xác nhận',
        },
        {
          id: 'q13',
          question: "We must act fast. It's **urgent**.",
          options: ['có sẵn', 'sớm', 'khẩn cấp', 'đúng giờ'],
          answer: 'khẩn cấp',
        },
        {
          id: 'q14',
          question: 'I need to **reschedule** our lunch.',
          options: ['dời lịch', 'đặt chỗ', 'hủy', 'xác nhận'],
          answer: 'lên lịch lại',
        },
        {
          id: 'q15',
          question: 'The doctor is not **available** this morning.',
          options: ['có mặt', 'có sẵn', 'trễ', 'đúng giờ'],
          answer: 'có sẵn',
        },
      ],
    },
    {
      title: 'Bài 3: Nối từ với nghĩa',
      description: 'Nối cột A (từ vựng) với cột B (nghĩa tiếng Việt)',
      type: 'matching',
      questions: [
        {
          id: 'q16',
          pairs: [
            { item: '1. delay', match: 'C. trì hoãn' },
            { item: '2. cancel', match: 'D. hủy' },
            { item: '3. early', match: 'E. sớm' },
            { item: '4. late', match: 'B. trễ' },
            { item: '5. schedule', match: 'A. lịch trình' },
          ],
        },
      ],
    },
    {
      title: 'Bài 4: Viết câu hoàn chỉnh (Gợi ý mẫu)',
      description: 'Viết 3 câu có sử dụng từ vựng dưới đây. (Gợi ý)',
      type: 'sentence_writing',
      questions: [
        {
          id: 'q17',
          prompt: 'appointment',
          example: 'I have an appointment with my dentist at 9 a.m.',
        },
        {
          id: 'q18',
          prompt: 'urgent',
          example: 'This message is urgent. Please read it now.',
        },
        {
          id: 'q19',
          prompt: 'notice',
          example: 'He put up a notice on the board.',
        },
      ],
    },
  ],
}; 