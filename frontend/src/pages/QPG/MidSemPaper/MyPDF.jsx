// MyPDF.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Line,
  Svg,
} from "@react-pdf/renderer";
import MarwadiuniversityLogo from "../../../images/Marwadi_University_logo.png";

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    // justifyContent: "center",
    // paddingTop: 50,
  },
});

const sectionA = [
  {
    id: 1,
    questionName: "What is Machine Learning",
    optionList: ["Hello", "hii", "hee", "asa"],
    difficulty: "Easy",
    unitName: "ML",
    selected: false,
  },
  {
    id: 2,
    questionName: "What is Machine Learning",
    optionList: ["Hello", "hii", "hee", "asa"],
    difficulty: "Easy",
    unitName: "CN",
    selected: false,
  },
  {
    id: 3,
    questionName: "What is Machine Learning",
    optionList: ["Hello", "hii", "hee", "asa"],
    difficulty: "Hard",
    unitName: "DSIP",
    selected: false,
  },
  {
    id: 4,
    questionName: "What is Machine Learning",
    optionList: ["Hello", "hii", "hee", "asa"],
    difficulty: "Moderate",
    unitName: "ML",
    selected: false,
  },
  {
    id: 5,
    questionName: "What is Machine Learning",
    optionList: ["Hello", "hii", "hee", "asa"],
    difficulty: "Moderate",
    unitName: "ML",
    selected: false,
  },
  {
    id: 6,
    questionName: "What is Machine Learning",
    optionList: ["Hello", "hii", "hee", "asa"],
    difficulty: "Moderate",
    unitName: "ML",
    selected: false,
  },
];

const sectionB = [
  {
    id: 1,
    questionName: "What is Machine Learning",
    difficulty: "Easy",
    unitName: "ML",
    selected: false,
  },
  {
    id: 2,
    questionName: "What is Machine Learning",
    difficulty: "Easy",
    unitName: "CN",
    selected: false,
  },
  {
    id: 3,
    questionName: "What is Machine Learning",
    difficulty: "Hard",
    unitName: "DSIP",
    selected: false,
  },
];

const sectionC = [
  {
    id: 1,
    questionName: "What is Machine Learning",
    difficulty: "Easy",
    unitName: "ML",
    selected: false,
  },
  {
    id: 2,
    questionName: "What is Machine Learning",
    difficulty: "Easy",
    unitName: "CN",
    selected: false,
  },
  {
    id: 3,
    questionName: "What is Machine Learning",
    difficulty: "Hard",
    unitName: "DSIP",
    selected: false,
  },
  {
    id: 4,
    questionName: "What is Machine Learning",
    difficulty: "Hard",
    unitName: "DSIP",
    selected: false,
  },
];
const SectionAContent = ({ data }) => (
  <View
    style={{
      flexDirection: "column",
      justifyContent: "space-between",
      paddingHorizontal: 50,
      marginTop: 15,
      wrap: "wrap",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
      }}
    >
      <Text style={{ fontSize: 10, fontWeight: "bold" }}>Section A : MCQ</Text>
      <Text style={{ fontSize: 10, fontWeight: "bold" }}>{"[6]"}</Text>
    </View>

    {data.map((question, index) => (
      <View
        key={index}
        style={{
          flexDirection: "column",
          paddingHorizontal: 40,
          padding: 15,
        }}
      >
        <Text style={{ fontSize: 10 }}>
          {index + 1}. {question.questionName}
        </Text>
        <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
          {question.optionList.map((option, optionIndex) => (
            <Text key={optionIndex} style={{ fontSize: 10 }}>
              {String.fromCharCode(97 + optionIndex)}. {option}
            </Text>
          ))}
        </View>
      </View>
    ))}
  </View>
);

const SectionBContent = ({ data }) => (
  <View
    style={{
      flexDirection: "column",
      justifyContent: "space-between",
      paddingHorizontal: 50,
      marginTop: 30,
      wrap: "wrap",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
      }}
    >
      <Text style={{ fontSize: 10, fontWeight: "bold" }}>
        Section B : Answer the Following Questions
      </Text>
      <Text style={{ fontSize: 10, fontWeight: "bold" }}>{"[12]"}</Text>
    </View>

    {data.map((question, index) => (
      <View
        key={index}
        style={{
          flexDirection: "column",
          paddingHorizontal: 40,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 10 }}>
            {index + 1}. {question.questionName}
          </Text>
          <Text style={{ fontSize: 10, marginLeft: 10 }}>{"[6]"}</Text>
        </View>
        {index === 1 && ( // Render centered text row after the first index
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>OR</Text>
          </View>
        )}
      </View>
    ))}
  </View>
);

const SectionCContent = ({ data }) => (
  <View
    style={{
      flexDirection: "column",
      justifyContent: "space-between",
      paddingHorizontal: 50,
      marginTop: 30,
      wrap: "wrap",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
      }}
    >
      <Text style={{ fontSize: 10, fontWeight: "bold" }}>
        Section C : Answer the Following Questions
      </Text>
      <Text style={{ fontSize: 10, fontWeight: "bold" }}>{"[12]"}</Text>
    </View>

    {data.map((question, index) => (
      <View
        key={index}
        style={{
          flexDirection: "column",
          paddingHorizontal: 40,
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 10 }}>
            {index + 1}. {question.questionName}
          </Text>
          {index % 2 == 0 ? (
            <Text style={{ fontSize: 10, marginLeft: 10 }}>{"[8]"}</Text>
          ) : (
            <Text style={{ fontSize: 10, marginLeft: 10 }}>{"[4]"}</Text>
          )}
        </View>
        {index === 1 && ( // Render centered text row after the first index
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>OR</Text>
          </View>
        )}
      </View>
    ))}
  </View>
);

const Footer = () => (
  <View
    fixed
    style={{
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 10,
    }}
  >
    <Svg height="10" width="500">
      <Line
        x1="700"
        y1="0"
        x2="50"
        y2="0"
        strokeWidth={2}
        stroke="rgb(0,0,0)"
      />
    </Svg>
    <Text style={{ paddingHorizontal: 50 }}>MARWADI UNIVERSITY</Text>
  </View>
);

const MyPDF = ({
  branchName,
  department,
  paper_type,
  paperdate,
  semester,
  subject,
  timeAllowance,
  totalMarks,
  sectionA_1_question,
}) => (
  console.log(branchName),
  console.log(sectionA_1_question),
  (
    <Document>
      <Page size="A4" style={{ flexDirection: "column", position: "relative" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "end",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <View style={{ float: "left", paddingTop: 50 }}>
            <Image
              src={MarwadiuniversityLogo}
              style={{
                width: 60,
                height: 70,
                objectFit: "cover",
                marginLeft: 20,
                marginRight: 30,
              }}
            />
          </View>
          <View style={{ float: "right", marginRight: 80, paddingTop: 50 }}>
            <Text style={{ fontSize: 10 }}>MARWADI UNIVERSITY</Text>
            <Text style={{ fontSize: 10, marginTop: 10 }}>{branchName}</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text style={{ fontSize: 10, marginRight: 30 }}>
                {department}
              </Text>
              <Text style={{ fontSize: 10, marginRight: 50 }}>B.Tech</Text>
            </View>
            <View style={{ fontSize: 10, marginTop: 5, flexDirection: "row" }}>
              <Text style={{ marginRight: 80 }}>sem {semester}</Text>
              <Text style={{ marginRight: 40 }}>{paper_type}</Text>
              <Text style={{ marginRight: 10 }}>{paperdate}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Svg height="10" width="500">
            <Line
              x1="700"
              y1="0"
              x2="50"
              y2="0"
              strokeWidth={2}
              stroke="rgb(0,0,0)"
            />
          </Svg>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Text style={{ fontSize: 10 }}>Subject :- {subject}(01CT105)</Text>
            <Text style={{ fontSize: 10 }}>Date :- {paperdate}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 10 }}>Total Marks :- {totalMarks}</Text>
            <Text style={{ fontSize: 10 }}>Time :- {timeAllowance}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 50,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            Instructions :-
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            Hello I am Namra Ravani from Marwadi University
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            Hello I am Namra Ravani from Marwadi University
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            Hello I am Namra Ravani from Marwadi University
          </Text>
        </View>
        <View style={{ height: "66%" }}>
          <SectionAContent data={sectionA} />
        </View>
        <View style={{ height: "50%" }}>
          <SectionBContent data={sectionB} />
        </View>
        <View style={{}}>
          <SectionCContent data={sectionC} />
        </View>

        <Footer />
      </Page>
    </Document>
  )
);

export default MyPDF;
