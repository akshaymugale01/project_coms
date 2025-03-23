import React, { useState } from "react";

const FitOutChecklistPage = () => {
  const [questions, setQuestions] = useState([{ id: 1, text: "" }]);

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: "" }]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <h1 className="text-xl font-semibold text-gray-800">Fitout Checklist</h1>

      {/* Checklist Form */}
      <div className="border rounded-lg p-6 shadow-md bg-white mt-4">
        <h2 className="text-lg font-semibold text-orange-600 flex items-center">
          ➕ Add Checklist
        </h2>

        {/* Category Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <select className="border p-2 rounded w-full">
            <option>Select Category *</option>
            <option>Electrical</option>
            <option>Plumbing</option>
          </select>
          <select className="border p-2 rounded w-full">
            <option>Select Sub-Category *</option>
            <option>Wiring</option>
            <option>Pipes</option>
          </select>
          <input type="text" placeholder="Enter Title *" className="border p-2 rounded w-full" />
        </div>

        {/* Number of Questions */}
        <div className="flex items-center gap-4 mt-6">
          <label className="font-semibold">Add No. of Questions:</label>
          <select className="border p-2 rounded">
            <option>01</option>
            <option>02</option>
            <option>03</option>
          </select>
          <span className="text-lg font-semibold">→ {questions.length}</span>
        </div>

        {/* Question List */}
        <div className="mt-4">
          {questions.map((q, index) => (
            <div key={q.id} className="flex items-start gap-4 mt-4 p-4 bg-gray-100 rounded-md">
              <textarea
                placeholder="Enter your Question"
                className="border p-2 rounded w-full"
              ></textarea>
              <select className="border p-2 rounded">
                <option>Choose Answer Type</option>
                <option>Text</option>
                <option>Yes/No</option>
                <option>Multiple Choice</option>
              </select>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Mandatory
              </label>
              <button onClick={() => removeQuestion(q.id)} className="text-red-600 text-xl">
                x
              </button>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <button onClick={addQuestion} className="mt-4 bg-gray-700 text-white py-2 px-4 rounded">
          + Add Question
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button className="bg-green-700 text-white py-2 px-6 rounded">Create Checklist</button>
        <button className="border border-gray-700 text-gray-700 py-2 px-6 rounded">Proceed</button>
      </div>
    </div>
  );
};

export default FitOutChecklistPage;
