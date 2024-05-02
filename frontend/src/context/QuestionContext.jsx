import { createContext, useState } from "react";

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [selectedQuestionData, setSelectedQuestionData] = useState(null);

  return (
    <QuestionContext.Provider
      value={{ selectedQuestionData, setSelectedQuestionData }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContext;
