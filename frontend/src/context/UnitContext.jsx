import { createContext, useState } from "react";

const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [selectedUnitData, setSelectedUnitData] = useState(null);
  const [selectedSubjectData, setSelectedSubjectData] = useState(null);

  return (
    <UnitContext.Provider
      value={{
        selectedUnitData,
        setSelectedUnitData,
        selectedSubjectData,
        setSelectedSubjectData,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};

export default UnitContext;
