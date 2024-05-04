import React, { useState } from "react";

import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import MyPDF from "./MyPDF";
import MarwadiuniversityLogo from "../../../images/Marwadi_University_logo.png";
import { dataMap } from "../paperData";

function MidSemPaper() {
  // State to hold the text and table data
  // const [sectionAContent, setSectionAContent] = useState([]);
  

  const branchName = dataMap["header"]["branchName"];
  const department = dataMap["header"]["departmentList"];
  const paper_type = dataMap["header"]["paperType"];
  const paperdate = dataMap["header"]["paperdate"];
  const semester = dataMap["header"]["semesterList"];
  const subject = dataMap["header"]["subject"];
  const timeAllowance = dataMap["header"]["timeAllowance"];
  const totalMarks = dataMap["header"]["totalMarks"];

  const sectionA_1_question = dataMap["sectionA"][0];

  

  console.log(sectionA_1_question);

  return (
    <div>
      <PDFViewer width="1000" height="600">
        <MyPDF
          branchName={branchName}
          department={department}
          paper_type={paper_type}
          paperdate={paperdate}
          semester={semester}
          subject={subject}
          timeAllowance={timeAllowance}
          totalMarks={totalMarks}
          sectionA_1_question={sectionA_1_question}
        />
      </PDFViewer>
      <PDFDownloadLink
        document={<MyPDF displayText="Hello" />}
        fileName="mypdf.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default MidSemPaper;
