import React, { useContext, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import ContextProviderContext from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const ShowQuestion = () => {
  const { selectedQuestionData } = useContext(ContextProviderContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedQuestionData) {
      navigate("/question/select-subject");
    }
  }, [selectedQuestionData, navigate]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Question Details" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          {selectedQuestionData ? (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Question Details
                </h3>
              </div>
              <div className="p-6.5 flex flex-col gap-5">
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <label className="labelfield">
                      Question Type
                      <input
                        value={selectedQuestionData.queType}
                        disabled
                        className="inputfield"
                      />
                    </label>
                  </div>
                  <div className="w-full">
                    <label className="labelfield">
                      Marks
                      <input
                        value={selectedQuestionData.marks}
                        disabled
                        className="inputfield"
                      />
                    </label>
                  </div>
                  <div className="w-full">
                    <label className="labelfield">
                      Level
                      <input
                        value={selectedQuestionData.level}
                        disabled
                        className="inputfield"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <label className="labelfield">
                    Question
                    <input
                      value={selectedQuestionData.queOrg}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
                {selectedQuestionData.queTrans && (
                  <div>
                    <label className="labelfield">
                      Translated Question
                      <input
                        value={selectedQuestionData.queTrans}
                        disabled
                        className="inputfield"
                      />
                    </label>
                  </div>
                )}
                {selectedQuestionData.mcqOptionsOrg.length > 0 &&
                  selectedQuestionData.mcqOptionsOrg[0] != "" && (
                    <div>
                      <label className="labelfield">MCQ Options</label>
                      <ul>
                        {selectedQuestionData.mcqOptionsOrg.map(
                          (option, index) => (
                            <input
                              key={index}
                              value={option}
                              disabled
                              className="inputfield"
                            />
                          )
                        )}
                      </ul>
                    </div>
                  )}
                <div>
                  <label className="labelfield">
                    Answer
                    <textarea
                      value={selectedQuestionData.answer}
                      disabled
                      rows={10}
                      className="inputfield min-h-[100px]"
                    />
                  </label>
                </div>
                <div>
                  <label className="labelfield">
                    Unit
                    <input
                      value={selectedQuestionData.unitId.unitName}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
                <div>
                  <label className="labelfield">
                    Subject Code
                    <input
                      value={selectedQuestionData.subjectId.subjectCode}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
                <div>
                  <label className="labelfield">
                    Created By
                    <input
                      value={selectedQuestionData.createdBy.username}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
                <div>
                  <label className="labelfield">
                    Updated By
                    <input
                      value={selectedQuestionData.updatedBy.username}
                      disabled
                      className="inputfield"
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ShowQuestion;
