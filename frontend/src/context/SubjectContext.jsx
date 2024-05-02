import { createContext, useState } from "react";

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [selectedSubjectData, setSelectedSubjectData] = useState(null);

  return (
    <SubjectContext.Provider
      value={{ selectedSubjectData, setSelectedSubjectData }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectContext;
