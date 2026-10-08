import { createContext, useContext, useState, type ReactNode } from "react";
export const story = [
  "Sáng chủ nhật, An ra vườn cùng bà.",
  "An thấy một cây cà chua nhỏ.",
  "Đất quanh cây đã khô.",
  "An lấy bình nước và tưới nhẹ vào gốc cây.",
  "Bà mỉm cười: “Cảm ơn An đã chăm sóc khu vườn.”",
];
export const questions = [
  {
    question: "An ra vườn cùng ai?",
    options: ["Cùng bà", "Cùng bạn", "Cùng bố"],
    answer: "Cùng bà",
    explanation: "Câu đầu kể: “An ra vườn cùng bà.”",
    line: 0,
  },
  {
    question: "Vì sao An tưới nước cho cây?",
    options: [
      "Vì trời đang mưa",
      "Vì đất quanh cây đã khô",
      "Vì An muốn hái quả",
    ],
    answer: "Vì đất quanh cây đã khô",
    explanation: "Đất đã khô. An tưới nước để chăm sóc cây.",
    line: 2,
  },
  {
    question: "An đã làm gì để chăm sóc khu vườn?",
    options: ["Ngắt lá cây", "Chạy quanh vườn", "Tưới nhẹ vào gốc cây"],
    answer: "Tưới nhẹ vào gốc cây",
    explanation: "An lấy bình nước và tưới nhẹ vào gốc cây.",
    line: 3,
  },
];
interface LearningState {
  questionIndex: number;
  selectedAnswer: string;
  answers: string[];
  completed: boolean;
  largeText: boolean;
  spacedText: boolean;
  chooseAnswer: (answer: string) => void;
  nextQuestion: () => void;
  startOver: () => void;
  setLargeText: (value: boolean) => void;
  setSpacedText: (value: boolean) => void;
}
const DataContext = createContext<LearningState | null>(null);
export function DataProvider({ children }: { children: ReactNode }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [spacedText, setSpacedText] = useState(false);
  const chooseAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setAnswers((current) => [...current, answer]);
  };
  const nextQuestion = () => {
    if (!selectedAnswer) return;
    if (questionIndex === questions.length - 1) setCompleted(true);
    else {
      setQuestionIndex((current) => current + 1);
      setSelectedAnswer("");
    }
  };
  const startOver = () => {
    setQuestionIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setCompleted(false);
  };
  return (
    <DataContext.Provider
      value={{
        questionIndex,
        selectedAnswer,
        answers,
        completed,
        largeText,
        spacedText,
        chooseAnswer,
        nextQuestion,
        startOver,
        setLargeText,
        setSpacedText,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export function useLearning() {
  const context = useContext(DataContext);
  if (!context) throw new Error("Learning provider is missing");
  return context;
}
export default DataContext;
