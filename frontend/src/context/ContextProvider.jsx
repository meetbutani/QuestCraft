import { createContext, useState } from "react";

const ContextProviderContext = createContext();

export const ContextProvider = ({ children }) => {
  const [selectedQuestionData, setSelectedQuestionData] = useState(null);
  const [selectedUnitData, setSelectedUnitData] = useState(null);
  const [selectedSubjectData, setSelectedSubjectData] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  const [selectedPaperData, setSelectedPaperData] = useState(null);

  return (
    <ContextProviderContext.Provider
      value={{
        selectedQuestionData,
        setSelectedQuestionData,
        selectedUnitData,
        setSelectedUnitData,
        selectedSubjectData,
        setSelectedSubjectData,
        selectedUserData,
        setSelectedUserData,
        selectedRoleData,
        setSelectedRoleData,
        selectedPaperData,
        setSelectedPaperData,
      }}
    >
      {children}
    </ContextProviderContext.Provider>
  );
};

export default ContextProviderContext;
