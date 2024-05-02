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
        <Text style={styles.text}>{displayText}</Text>
      </View>
    </Page>
  </Document>
);

export default MyPDF;
