import React, { useState } from "react";

import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import MyPDF from "./MyPDF";

function App() {
  // State to hold the text and table data

  return (
    <div>
      <PDFViewer width="1000" height="600">
        <MyPDF displayText="hello" />
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

export default App;
