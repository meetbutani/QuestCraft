// MyPDF.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

const MyPDF = ({ displayText }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <div className="flex flex-row">
          <img
            src={frontend / src / images / Marwadi_University_logo.png}
            alt="My Image"
          />
        </div>
      </View>
    </Page>
  </Document>
);

export default MyPDF;
