import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import axiosInstance from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import {
  FaRegSmile,
  FaSmile,
  FaSmileBeam,
  FaGrinHearts,
  FaGrin,
} from "react-icons/fa";

const WorkplaceSurvey = () => {
  const [surveyList, setSurveyList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [doSurvey, setDoSurvey] = useState(false);

  /* ================= LOAD SURVEY LIST ================= */
  const loadSurveyList = async () => {
    try {
      const res = await axiosInstance.get("/survey/list/");
      setSurveyList(res.data); // assumes array of surveys
    } catch (error) {
      toast.error("Failed to load survey list");
    }
  };

  useEffect(() => {
    loadSurveyList();
  }, []);

  /* ================= START SURVEY ================= */
  const startSurvey = async (surveyId) => {
    try {
      const res = await axiosInstance.get(`/survey/questions/${surveyId}/`);
      const questionsData = res.data.survey_questions || res.data; // adjust if API returns survey_questions array
      setQuestions(questionsData);
      setSelectedSurveyId(surveyId);

      const initialResponses = {};
      questionsData.forEach((q) => {
        initialResponses[q.id] = { value: "" }; // store answer in 'value'
      });
      setResponses(initialResponses);
      setDoSurvey(true);
      setCurrentQuestionIndex(0);
    } catch (err) {
      toast.error("Failed to load questions");
    }
  };

  /* ================= HANDLE RESPONSE ================= */
  const handleAnswerChange = (value) => {
    const qId = questions[currentQuestionIndex].id;
    setResponses((prev) => ({
      ...prev,
      [qId]: { value },
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const unanswered = Object.values(responses).some((res) => !res.value);
    if (unanswered) {
      toast.error("Please answer all questions");
      return;
    }

    try {
      await axiosInstance.post("/survey/submit/", {
        survey_id: selectedSurveyId,
        responses,
      });
      toast.success("Survey submitted successfully");

      setDoSurvey(false);
      setCurrentQuestionIndex(0);
      setQuestions([]);
      setResponses({});
      setSelectedSurveyId(null);
    } catch {
      toast.error("Submission failed");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const renderQuestion = (question) => {
    switch (question.question_type) {
      case "single_choice":
        return (
          <div className="flex flex-col gap-2 mb-4">
            {question.options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={opt.label}
                  checked={responses[question.id]?.value === opt.label}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );

      case "rating":
        return (
          <div className="flex gap-2 mb-4">
            {[...Array(10)].map((_, i) => {
              const rating = i + 1;
              const selected = responses[question.id]?.value === rating;
              const getSmileyColor = (rating) => {
                if (rating <= 2) return "text-red-500";
                if (rating <= 4) return "text-orange-500";
                if (rating <= 6) return "text-yellow-500";
                if (rating <= 8) return "text-blue-500";
                return "text-green-500";
              };

              return (
                <div
                  key={rating}
                  onClick={() => handleAnswerChange(rating)}
                  className={`cursor-pointer transition-all ${
                    selected ? "scale-125" : "opacity-60"
                  } ${getSmileyColor(rating)}`}
                >
                  {rating <= 2 ? (
                    <FaRegSmile size={35} />
                  ) : rating <= 4 ? (
                    <FaSmile size={35} />
                  ) : rating <= 6 ? (
                    <FaSmileBeam size={35} />
                  ) : rating <= 8 ? (
                    <FaGrinHearts size={35} />
                  ) : (
                    <FaGrin size={35} />
                  )}
                </div>
              );
            })}
          </div>
        );

      case "scale":
        return (
          <div className="flex gap-2 mb-4">
            {Array.from(
              { length: question.max_value - question.min_value + 1 },
              (_, i) => question.min_value + i
            ).map((val) => (
              <button
                key={val}
                onClick={() => handleAnswerChange(val)}
                className={`px-3 py-1 border rounded ${
                  responses[question.id]?.value === val
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        );

      default:
        return <p>Unknown question type</p>;
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full flex flex-col">
        {!doSurvey && (
          <>
            {surveyList.map((survey) => (
              <div
                key={survey.id}
                className="border p-3 mb-3 flex justify-between rounded"
              >
                <div>
                  <h3 className="font-bold">{survey.survey_title}</h3>
                  <p className="text-sm text-gray-500">
                    {survey.start_date.split("T")[0]} -{" "}
                    {survey.end_date.split("T")[0]}
                  </p>
                  <p>{survey.description}</p>
                </div>

                <button
                  onClick={() => startSurvey(survey.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Start
                </button>
              </div>
            ))}
          </>
        )}

        {doSurvey && currentQuestion && (
          <div>
            <h2 className="text-xl font-bold mb-3">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>

            <p className="mb-4">{currentQuestion.q_title}</p>

            {renderQuestion(currentQuestion)}

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentQuestionIndex((p) => p - 1)}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
              >
                Back
              </button>

              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestionIndex((p) => p + 1)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkplaceSurvey;