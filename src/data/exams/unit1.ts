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
        'appointment',
        'concerned',
        'reschedule',
        'on_time',
        'confirm',
        'memo',
        'late',
        'available',
        'cancel',
        'timetable',
      ],
      questions: [
        {
          id: 'q1',
          question: 'I have an __________ with the doctor at 3 p.m.',
          answer: ['appointment'],
        },
        {
          id: 'q2',
          question: 'She was very __________ because of the accident.',
          answer: ['concerned'],
        },
        {
          id: 'q3',
          question: 'We need to __________ the meeting to next week.',
          answer: ['reschedule'],
        },
        {
          id: 'q4',
          question: 'The train is never __________. It always comes late.',
          answer: ['on_time'],
        },
        {
          id: 'q5',
          question: 'Can you __________ the time for our flight?',
          answer: ['confirm'],
        },
        { id: 'q6', question: 'He sent a __________ to all employees about the new policy.', answer: ['memo'] },
        { id: 'q7', question: "Sorry, I'm __________. The traffic was bad.", answer: ['late'] },
        {
          id: 'q8',
          question: "I am not __________ tomorrow. Let's meet next Monday.",
          answer: ['available'],
        },
        { id: 'q9', question: 'They had to __________ the concert because of the rain.', answer: ['cancel'] },
        {
          id: 'q10',
          question: "Let's check the __________ to see when the class starts.",
          answer: ['timetable'],
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
          answer: 'dời lịch',
        },
        {
          id: 'q15',
          question: 'The doctor is not **available** this morning.',
          options: ['có mặt', 'không rảnh', 'trễ', 'đúng giờ'],
          answer: 'không rảnh',
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
            { item: '4. available', match: 'A. có sẵn' },
            { item: '5. late', match: 'B. trễ' },
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
          prompt: 'delay',
          example: 'The flight has a 30-minute delay.',
        },
      ],
    },
  ],
}; 