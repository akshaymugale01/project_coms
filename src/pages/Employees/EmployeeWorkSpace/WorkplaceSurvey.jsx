import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { FaRegSmile, FaSmile, FaSmileBeam, FaGrinHearts, FaGrin } from "react-icons/fa";
import toast from "react-hot-toast";
const WorkplaceSurvey = () => {
  const [questions] = useState([
    "How satisfied are you with the overall work environment?",
    "How would you rate the support you receive from your direct manager?",
    
    "How would you rate the clarity of communication from upper management?",
    "How well do you feel your contributions are recognized and valued by the company?",
    "How satisfied are you with the professional development opportunities provided by the company?",
    
    "How satisfied are you with the company's approach to employee health and wellness?",
    "How likely are you to recommend this company as a place to work to a friend or colleague?",
    "How well do you think the company's policies support diversity and inclusion in the workplace?",
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(
    questions.reduce((acc, question) => {
      acc[question] = { rating: "", comment: "" };
      return acc;
    }, {})
  );

  const handleRatingChange = (rating) => {
    const currentQuestion = questions[currentQuestionIndex];
    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentQuestion]: { ...prevResponses[currentQuestion], rating },
    }));
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    const currentQuestion = questions[currentQuestionIndex];
    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentQuestion]: { ...prevResponses[currentQuestion], comment: value },
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleCancel = () => {
   setDoSurvey(false)
  };

  const handleSubmit = () => {
    toast.success("Survey completed Successfully")
    setDoSurvey(false)
    console.log(responses);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const smileyRatings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [doSurvey, setDoSurvey] = useState(false);
  const getSmileyColor = (rating) => {
    if (rating <= 2) return "text-red-500";   // Red for low ratings
    if (rating <= 4) return "text-orange-500"; // Orange for slightly low ratings
    if (rating <= 6) return "text-yellow-500"; // Yellow for neutral ratings
    if (rating <= 8) return "text-blue-500"; // Green for good ratings
   
    return "text-green-500"; 
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        {!doSurvey && (
            <>
         <h2 className="font-medium border-b border-gray-400 text-xl mb-2">Survey List</h2>
            <div className=" flex justify-between items-center border rounded-xl p-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold ">
                Employee Satisfaction Survey
              </h2>
              <span className="text-gray-400 text-sm">
                Start Date: 28/08/2024{" "}
              </span>
              <span className="text-gray-400 text-sm">
                End Date: 05/09/2024{" "}
              </span>
            </div>
            <p className="bg-red-400 text-white rounded-full p-1 px-2">Mandatory</p>
            <button
              onClick={() => setDoSurvey(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Start Survey
            </button>
          </div>
           </>
          
        )}
        {doSurvey && (
          <div className="flex">
            {/* List of Questions */}
            <div className="w-96  border-r">
              <h2 className="text-xl font-bold">Questions</h2>
              <ul>
                {questions.map((question, index) => (
                  <li
                    key={index}
                    className={`p-2 cursor-pointer border-b ${
                      index === currentQuestionIndex ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            {/* Question Detail */}
            <div className="w-3/4 p-4">
              <h2 className="text-xl font-bold">Survey</h2>
              <div className="mb-4">
                <h3 className="text-lg">{currentQuestion}</h3>
              </div>
              <div className="flex gap-2 mb-4">
            {[...Array(10)].map((_, index) => {
              const rating = index + 1;
              return (
                <div
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`cursor-pointer text-2xl ${getSmileyColor(rating)} ${
                    responses[currentQuestion]?.rating === rating ? 'scale-125' : ''
                  } transition-transform`}
                >
                  {rating <= 2 ? (
                    <FaRegSmile size={40} />
                  ) : rating <= 4 ? (
                    <FaSmile size={40} />
                  ) : rating <= 6 ? (
                    <FaSmileBeam size={40} />
                  ) : rating <= 8 ? (
                    <FaGrinHearts size={40} />
                  ) : (
                    <FaGrin size={40} />
                  )}
                </div>
              );
            })}
          </div>
              <div className="mb-4">
                <label className="block mb-2">Comment</label>
                <textarea
                  value={responses[currentQuestion]?.comment || ""}
                  onChange={handleCommentChange}
                  rows="2"
                  className="p-2 border rounded-md border-gray-300 w-full"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleCancel}
                  className="bg-red-300 p-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBack}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-500 text-white p-2 px-4 rounded"
                >
                  Next
                </button>
                {currentQuestionIndex === questions.length - 1 && (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white p-2 px-4 rounded"
                  >
                    Submit Response
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkplaceSurvey;
