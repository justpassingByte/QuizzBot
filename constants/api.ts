import axios from 'axios';
export const API_URL = 'http://192.168.0.103:3000';
//http://10.0.2.2:3000
// Lấy danh sách quiz từ API thật, fallback mock nếu lỗi
export async function fetchQuizzes() {
  try {
    const res = await axios.get(`${API_URL}/api/quizzes`);
    console.log(res.data);
    
    return res.data;
  } catch (e) {
    // fallback mock
    return [
      {
        id: '2d985b45-8c91-4886-8f57-c92a996d86f0',
        topic: 'Deep Learning',
        questionCount: 10,
        createdAt: '2025-04-12T14:35:24.731Z',
        updatedAt: '2025-04-12T14:35:24.919Z',
        score: 0.5,
      },
      {
        id: '1',
        topic: 'Harry Potter',
        questionCount: 8,
        createdAt: '',
        updatedAt: '',
        score: 0.7,
      },
      {
        id: '2',
        topic: 'Math',
        questionCount: 12,
        createdAt: '',
        updatedAt: '',
        score: 0.6,
      },
      {
        id: '3',
        topic: 'Science',
        questionCount: 9,
        createdAt: '',
        updatedAt: '',
        score: 0.8,
      },
      {
        id: '4',
        topic: 'Movies',
        questionCount: 7,
        createdAt: '',
        updatedAt: '',
        score: 0.4,
      },
    ];
  }
}

// Tạo quiz mới, nhận topic và config, trả về quizId
export async function createQuiz(topic: string, config: any, level: string = 'intermediate') {
  const payload = { topic, config, level };
  const res = await axios.post(`${API_URL}/api/create`, payload);
  return res.data?.id || res.data?.quiz?.id;
}

// Lấy quiz theo id, trả về danh sách câu hỏi chuẩn hóa cho quiz.tsx
export async function getQuestionById(quizId: string) {
  try {
    const res = await axios.get(`${API_URL}/api/quizzes/${quizId}`);
    // Chuẩn hóa dữ liệu trả về cho quiz.tsx
    const quiz = res.data;
    const questions = quiz.quiz?.questions || quiz.questions || [];
    return questions.map((q: any) => ({
      question: q.text,
      answers: q.answers || [],
      explanation: q.explanation,
      id: q.id,
    }));
  } catch (e) {
    console.log(e);
    // fallback mock
    return [
      {
        question: 'Sample question for quiz ' + quizId,
        answers: [
          { text: 'Answer 1', correct: true },
          { text: 'Answer 2', correct: false },
          { text: 'Answer 3', correct: false },
          { text: 'Answer 4', correct: false },
        ],
        explanation: '',
        id: 'mock',
      },
    ];
  }
}

// Gọi context analyzer để lấy các topic liên quan, keyConcepts, ...
export async function analyzeContext(topic: string) {
  const res = await axios.post(`${API_URL}/api/context-analysis`, { topic });
  return res.data;
}

// Cập nhật chủ đề yêu thích của người dùng
export async function updateUserFavoriteTopics(userId: string, topics: string[]) {
  try {
    const res = await axios.put(`${API_URL}/api/users/${userId}/favorite-topics`, {
      topics: topics,
      action: 'replace' // Hoặc 'add', 'remove' tùy theo yêu cầu
    });
    return res.data;
  } catch (error) {
    console.error('Error updating user favorite topics:', error);
    throw error;
  }
}

// Lấy quiz recommend cho user
export async function fetchRecommendedQuizzes(userId: string) {
  try {
    const res = await axios.get(`${API_URL}/api/recommended/${userId}`);
    return res.data?.quizzes || [];
  } catch (e) {
    console.error('Failed to fetch recommended quizzes', e);
    return [];
  }
} 