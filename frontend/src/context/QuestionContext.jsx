import { createContext, useState } from "react";

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [selectedQuestionData, setSelectedQuestionData] = useState(null);
  const [selectedUnitData, setSelectedUnitData] = useState(null);
  const [selectedSubjectData, setSelectedSubjectData] = useState(null);

  return (
    <QuestionContext.Provider
      value={{
        selectedQuestionData,
        setSelectedQuestionData,
        selectedUnitData,
        setSelectedUnitData,
        selectedSubjectData,
        setSelectedSubjectData,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContext;
