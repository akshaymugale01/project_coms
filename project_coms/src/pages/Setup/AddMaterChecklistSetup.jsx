import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import Switch from '../../Buttons/Switch';
import { IoMdAdd } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';

function AddMasterCheckListSetup() {
  const [createTicket, setCreateTicket] = useState(false);
  const [weightage, setWeightage] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  // Handle changing the type of input in the select dropdown
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Handle adding a section
  const handleAddSection = (event) => {
    event.preventDefault();
    setSections([...sections, { name: '', type: '', questions: [], selectDropDown: [], selectRadioButton: [], selectCheckBox: [], selectNumeric: [], selectOptionInput: [] }]);
  };

  // Handle removing a section
  const handleRemoveSection = (sectionIndex) => {
    const newSections = [...sections];
    newSections.splice(sectionIndex, 1);
    setSections(newSections);
  };

  // Handle section input change
  const handleSectionInputChange = (sectionIndex, event) => {
    const { name, value, type, checked } = event.target;
    const newSections = [...sections];
    newSections[sectionIndex][name] = type === 'checkbox' ? checked : value;
    setSections(newSections);
  };

  // Handle adding a question to a section
  const handleAddQuestion = (sectionIndex, event) => {
    event.preventDefault();
    const newSections = [...sections];
    newSections[sectionIndex].questions.push({ name: '', type: '', reading: false, helpText: false });
    setSections(newSections);
  };

  // Handle removing a question from a section
  const handleRemoveQuestion = (sectionIndex, questionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].questions.splice(questionIndex, 1);
    setSections(newSections);
  };

  // Handle question input change within a section
  const handleQuestionInputChange = (sectionIndex, questionIndex, event) => {
    const { name, value, type, checked } = event.target;
    const newSections = [...sections];
    newSections[sectionIndex].questions[questionIndex][name] = type === 'checkbox' ? checked : value;
    setSections(newSections);
  };

  // Dropdown handlers at section level
  const handleAddDropDown = (sectionIndex, event) => {
    event.preventDefault();
    const newSections = [...sections];
    newSections[sectionIndex].selectDropDown.push({ select: '', value: '' });
    setSections(newSections);
  };

  const handleInputChangeDropDown = (sectionIndex, dropDownIndex, event) => {
    const { name, value } = event.target;
    const newSections = [...sections];
    newSections[sectionIndex].selectDropDown[dropDownIndex][name] = value;
    setSections(newSections);
  };

  const handleRemoveDropDown = (sectionIndex, dropDownIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].selectDropDown.splice(dropDownIndex, 1);
    setSections(newSections);
  };

  //radio button
  const [selectRadioButton, setSelectRadioButton]= useState([])
    const handleAddRadioButton = (event) => {
    event.preventDefault();
    setSelectRadioButton([...selectRadioButton, { name: '', mobile: '' }]);
  };

  const handleInputChangeRadioButton = (index, event) => {
    const { name, value } = event.target;
    const newRadioButton = [...selectRadioButton];
    newRadioButton[index][name] = value;
    setSelectRadioButton(newRadioButton);
  };

  const handleRemoveRadioButton = (index) => {
    const newRadioButton = [...selectRadioButton];
    newRadioButton.splice(index, 1);
    setSelectRadioButton(newRadioButton);
  };

  //checkbox
  const [selectCheckBox, setSelectCheckBox]= useState([])
    const handleAddCheckBox = (event) => {
    event.preventDefault();
    setSelectCheckBox([...selectCheckBox, { value: '', type: '' }]);
  };

  const handleInputChangeCheckBox = (index, event) => {
    const { name, value } = event.target;
    const newCheckBox = [...selectCheckBox];
    newCheckBox[index][name] = value;
    setSelectCheckBox(newCheckBox);
  };

  const handleRemoveCheckBox = (index) => {
    const newCheckBox = [...selectCheckBox];
    newCheckBox.splice(index, 1);
    setSelectCheckBox(newCheckBox);
  };

  //Numeric
  const [selectNumeric, setSelectNumeric]= useState([])
    const handleAddNumeric = (event) => {
    event.preventDefault();
    setSelectNumeric([...selectNumeric, { value: '', type: '' }]);
  };

  const handleInputChangeNumeric = (index, event) => {
    const { name, value } = event.target;
    const newNumeric = [...selectNumeric];
    newNumeric[index][name] = value;
    setSelectNumeric(newNumeric);
  };

  const handleRemoveNumeric = (index) => {
    const newNumeric = [...selectNumeric];
    newNumeric.splice(index, 1);
    setSelectNumeric(newNumeric);
  };

  //OptionInput
  const [selectOptionInput, setSelectOptionInput]= useState([])
    const handleAddOptionInput = (event) => {
    event.preventDefault();
    setSelectOptionInput([...selectOptionInput, { value: '', type: '' }]);
  };

  const handleInputChangeOptionInput = (index, event) => {
    const { name, value } = event.target;
    const newOptionInput = [...selectOptionInput];
    newOptionInput[index][name] = value;
    setSelectOptionInput(newOptionInput);
  };

  const handleRemoveOptionInput = (index) => {
    const newOptionInput = [...selectOptionInput];
    newOptionInput.splice(index, 1);
    setSelectOptionInput(newOptionInput);
  };


 // const handleChange = (event) => {
   // setSelectedValue(event.target.value);
  //};



  return (
    <section className='flex'>
      <div className='hidden md:block'>
        <Navbar/>
      </div>
      <div className="w-full flex  flex-col overflow-hidden">
        <h2 className="text-center text-xl font-bold my-5 p-2 bg-black rounded-full text-white mx-5">
          Add Master CheckList
        </h2>
        <div className='flex justify-center'>
          <div className='border border-gray-400 p-5 px-10 rounded-lg w-4/5 mb-14'>
            <div className='md:grid grid-cols-2 gap-5 my-3'>
              <div className="flex flex-col ">
                <div className='flex gap-3'>
                  <label htmlFor="meterApplicable">Create Ticket </label>
                    <Switch  onChange={() => setCreateTicket(!createTicket)}/>
                </div>
                {createTicket && (
                  <div className='lg:grid grid-cols-3 my-3'>
                    <div className='flex flex-col my-2'>
                      <div className='flex gap-3'>
                        <label htmlFor="meterApplicable">Checklist Level</label>
                        <input type="checkbox" name="level" id="meterApplicable" ></input>
                      </div>
                    </div>
                    <div className='flex flex-col my-2'>
                      <div className='flex gap-3'>
                        <label htmlFor="meterApplicable">Question Level</label>
                        <input type="checkbox" name="level" id="meterApplicable" ></input>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <select className="border p-1 px-4 border-gray-500 rounded-md">
                        <option value="">Select Category</option>
                        <option value="">Elevator</option>
                        <option value="">IT Support</option>
                        <option value="">Air Conditioning</option>
                        <option value="">Cafeteria/Pantry</option>
                        <option value="">Other</option>
                        <option value="">Pantry</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col ">
                <div className='flex gap-3'>
                  <label htmlFor="meterApplicable">Create Ticket </label>
                  <Switch  onChange={() => setWeightage(!weightage)}/>
                </div>
              </div>
            </div>
              <h2 className='border-b border-black my-5 text-xl font-semibold'>Basic Info</h2>
                        <div className="md:grid grid-cols-7 items-center">
                            <div>
                              <label htmlFor="meterApplicable" className='text-sm font-semibold'>Type</label>
                            </div>
                            <div className='flex md:flex-row flex- gap-5'>
                               <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name='masterCheckList'
                                        className="checked:accent-black"
                                    />
                                    <label htmlFor="yes">PPM</label>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name='masterCheckList'
                                        className="checked:accent-black"
                                    />
                                    <label htmlFor="yes">AMC</label>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name='masterCheckList'
                                        className="checked:accent-black"
                                    />
                                    <label htmlFor="yes">Preparedness</label>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name='masterCheckList'
                                        className="checked:accent-black"
                                    />
                                    <label htmlFor="yes">Hoto</label>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name='masterCheckList'
                                        className="checked:accent-black"
                                    />
                                    <label htmlFor="yes">Routine</label>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 items-center my-5">
                            <div>
                              <label htmlFor="meterApplicable" className='text-sm font-semibold'>Schedule For</label>
                            </div>
                            <div className='flex gap-5'>
                               <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name='masterCheckList'
                                        className="checked:accent-black"
                                    />
                                    <label htmlFor="yes">Asset</label>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name='masterCheckList'
                                        className="checked:accent-black"
                                    />
                                    <label htmlFor="yes">Service</label>
                                </div>
                            </div>
                        </div>
                        <div className='md:grid grid-cols gap-5 my-3'>
                                <div className='flex flex-col '>
                                    <div className='flex gap-10'>
                                        <label htmlFor="" className="font-semibold ">
                                            Activity Name  
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Enter Activity Name  "
                                          className="border p-1 px-4 border-gray-500 rounded-md w-4/5"
                                        />
                                    </div>
                                </div>
                        </div>
                        <div className='md:grid grid-cols gap-5 my-3'>
                                <div className='flex flex-col '>
                                    <div className='flex gap-14'>
                                        <label htmlFor="" className="font-semibold ">
                                            Description  
                                        </label>
                                        <textarea
                                          name=""
                                          id=""
                                          cols="4"
                                          rows="2"
                                          placeholder="Description"
                                          className="border p-1 px-4 border-gray-500 rounded-md w-4/5"
                                        />
                                    </div>
                                </div>
                        </div>
                        <h2 className='border-b border-black my-5 text-xl font-semibold'>Tasks</h2>
                        <div className='flex justify-end my-5'>
                       <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md' onClick={handleAddSection}>
                          <IoMdAdd /> Add Section
                       </button>
                    </div>
                    {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className='border-2 border-black rounded-md my-10'>
          <div className='flex justify-between my-5 mx-5'>
            <div className='md:grid grid-cols-2 gap-3'>
              <div className="flex flex-col my-3">
                <select className="border p-1 px-4 border-gray-500 rounded-md" name="type" value={section.type} onChange={(e) => handleSectionInputChange(sectionIndex, e)}>
                  <option value="">Select Group</option>
                  {/* Add options as needed */}
                </select>
              </div>
              <div className="flex flex-col my-3">
                <select className="border p-1 px-4 border-gray-500 rounded-md" name="subGroup" value={section.subGroup} onChange={(e) => handleSectionInputChange(sectionIndex, e)}>
                  <option value="">Select Sub Group</option>
                  {/* Add options as needed */}
                </select>
              </div>
            </div>
            <div className='mt-5'>
              <button onClick={() => handleRemoveSection(sectionIndex)}><FaTrash /></button>
            </div>
          </div>
          <div className='lg:grid grid-cols-6 gap-5 mx-5'>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-2">Task</label>
              <input
                type="text"
                placeholder="Enter Task"
                className="border p-1 px-4 border-gray-500 rounded-md"
                name="task"
                value={section.task}
                onChange={(e) => handleSectionInputChange(sectionIndex, e)}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="" className="font-semibold my-2">Input Type</label>
              <select
              id="select"
              name="type"
            value={section.type}
            onChange={(event) => handleSectionInputChange(sectionIndex, event)}
            className="border p-1 px-4 border-gray-500 rounded-md"
          >
            <option value="">Select Input Type</option>
            <option value="text">Text</option>
            <option value="dropDown">Drop Down</option>
            <option value="radioButton">Radio Button</option>
            <option value="checkBox">CheckBox</option>
            <option value="numeric">Numeric</option>
            <option value="multiline">Multiline</option>
            <option value="date">Date</option>
            <option value="optionInput">Option and Inputs</option>
          </select>
            </div>
            <div className="flex flex-col ">
              <div className='lg:mt-8'>
                <div className='flex gap-2'>
                  <label htmlFor="" className="font-semibold my-2">Mandatory</label>
                  <input type='checkbox' name='mandatory' checked={section.mandatory} onChange={(e) => handleSectionInputChange(sectionIndex, e)}></input>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className='lg:mt-8'>
                <div className='flex gap-2'>
                  <label htmlFor="" className="font-semibold my-2">Reading</label>
                  <input type='checkbox' name='reading' checked={section.reading} onChange={(e) => handleSectionInputChange(sectionIndex, e)}></input>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className='lg:mt-8'>
                <div className='flex gap-2'>
                  <label htmlFor="" className="font-semibold my-2">Help Text</label>
                  <input type='checkbox' name='helpText' checked={section.helpText} onChange={(e) => handleSectionInputChange(sectionIndex, e)}></input>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:grid grid-cols gap-5 mx-5'>
          {section.type === 'dropDown' && (
            <div>
              <div className="flex flex-col">
                <label className="font-semibold my-2">Selected Enter Value</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Yes"
                    name="value"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                  <select className="border-2 border-black rounded-md p-1" name="select">
                    <option>Select</option>
                    <option value="P">P</option>
                    <option value="N">N</option>
                  </select>
                </div>
              </div>

              {section.selectDropDown.map((dropDown, dropDownIndex) => (
                <div key={dropDownIndex} className="grid md:grid-cols-3 items-start gap-x-4 gap-y-4 mb-3 w-full">
                  <div className="flex flex-col">
                    <label className="font-semibold my-2">Selected Enter Value</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="value"
                        placeholder="Yes"
                        value={dropDown.value}
                        onChange={(event) => handleInputChangeDropDown(sectionIndex, dropDownIndex, event)}
                        className="border p-1 px-4 border-gray-500 rounded-md"
                      />
                      <select
                        className="border-2 border-black rounded-md p-1"
                        name="select"
                        value={dropDown.select}
                        onChange={(event) => handleInputChangeDropDown(sectionIndex, dropDownIndex, event)}
                      >
                        <option>Select</option>
                        <option value="P">P</option>
                        <option value="N">N</option>
                      </select>
                    </div>
                  </div>
                  <div className="my-3">
                    <button onClick={() => handleRemoveDropDown(sectionIndex, dropDownIndex)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  className="border-2 border-black p-1 rounded-md"
                  onClick={(event) => handleAddDropDown(sectionIndex, event)}
                >
                  Add Option
                </button>
              </div>
            </div>
          )}
            {selectedValue === 'radioButton' && (
                <div className="section">
                     <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected Enter Value</label>
                          <div className='flex gap-3'>
                            <input
                                type="radio"
                                id="yes"
                                name='masterCheckList'
                                className="checked:accent-black"
                            />
                            <input
                              type="text"
                              placeholder="Yes"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                            <select className='border-2 border-black rounded-md p-1'>
                                <option>Select</option>
                                <option>P</option>
                                <option>N</option>
                            </select>
                            </div>
                        </div>
                        {selectRadioButton.map((radioButton, index) => (
                  <div key={index}>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                    <div className='flex flex-col'>
                     <label className="font-semibold my-2">Selected </label>
                     <div className='flex gap-3'>
                     <input
                        type="radio"
                        id="yes"
                        name='masterCheckList'
                        className="checked:accent-black"
                      />
                     <input
                        type="text"
                        placeholder="Yes"
                       className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                      <select className='border-2 border-black rounded-md p-1'>
                      <option>Select</option>
                      <option>P</option>
                        <option>N</option>
                       </select>
                      </div>
                        </div>
                     <div className='my-'>
                     <button onClick={() => handleRemoveRadioButton(index)}>
                        <FaTrash />
                      </button>
                     </div>
                    </div>
                  </div>
                ))}
                        <div className='flex justify-end'>
                            <button className='border-2 border-black p-1 rounded-md' onClick={handleAddRadioButton}>Add Option</button>
                        </div>
                </div>
            )}
            {selectedValue === 'checkBox' && (
                <div className="section">
                    <div>
                       <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected Enter Value</label>
                          <div className='flex gap-3'>
                            <input
                                type="checkbox"
                                id="yes"
                                name='masterCheckList'
                                className="checked:accent-black"
                            />
                            <input
                              type="text"
                              placeholder="Yes"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                            </div>
                        </div>
                        {selectCheckBox.map((checkBox, index) => (
                  <div key={index}>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                    <div className='flex flex-col'>
                     <label className="font-semibold my-2">Selected </label>
                     <div className='flex gap-3'>
                     <input
                        type="checkbox"
                        id="yes"
                        name='masterCheckList'
                        className="checked:accent-black"
                      />
                     <input
                        type="text"
                        placeholder="Yes"
                       className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                      <select className='border-2 border-black rounded-md p-1'>
                      <option>Select</option>
                      <option>P</option>
                        <option>N</option>
                       </select>
                      </div>
                        </div>
                     <div className='my-3'>
                     <button onClick={() => handleRemoveCheckBox(index)}>
                        <FaTrash />
                      </button>
                     </div>
                    </div>
                  </div>
                ))}
                        <div className='flex justify-end'>
                            <button className='border-2 border-black p-1 rounded-md' onClick={handleAddCheckBox}>Add Option</button>
                        </div>
                    </div>
                </div>
            )}
            {selectedValue === 'numeric' && (
                <div className="section">
                    <div>
                       <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected measure type</label>
                          <div className='flex gap-3'>
                          <select className='border-2 border-black rounded-md p-1'>
                            <option>Select measure type</option>
                            <option>Consumption</option>
                            <option>Non Consumption</option>
                          </select>
                            </div>
                        </div>
                        {selectNumeric.map((numeric, index) => (
                  <div key={index}>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                    <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected measure type</label>
                          <div className='flex gap-3'>
                          <select className='border-2 border-black rounded-md p-1'>
                            <option>Select measure type</option>
                            <option>Consumption</option>
                            <option>Non Consumption</option>
                          </select>
                            </div>
                        </div>
                     <div className='my-3'>
                     <button onClick={() => handleRemoveNumeric(index)}>
                        <FaTrash />
                      </button>
                     </div>
                    </div>
                  </div>
                ))}
                        <div className='flex justify-end'>
                            <button className='border-2 border-black p-1 rounded-md' onClick={handleAddNumeric}>Add Option</button>
                        </div>
                    </div>
                </div>
            )}
            {selectedValue === 'optionInput' && (
                <div className="section">
                    <div>
                       <div className='flex flex-col'>
                            <label className="font-semibold my-2"> Enter Value</label>
                          <div className='flex gap-3'>
                            <input
                              type="text"
                              placeholder="Yes"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                            </div>
                        </div>
                        {selectOptionInput.map((optionInput, index) => (
                  <div key={index}>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                    <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected measure type</label>
                          <div className='flex gap-3'>
                          <select className='border-2 border-black rounded-md p-1'>
                            <option>Select measure type</option>
                            <option>Consumption</option>
                            <option>Non Consumption</option>
                          </select>
                            </div>
                        </div>
                     <div className='my-3'>
                     <button onClick={() => handleRemoveOptionInput(index)}>
                        <FaTrash />
                      </button>
                     </div>
                    </div>
                  </div>
                ))}
                        <div className='flex justify-end'>
                            <button className='border-2 border-black p-1 rounded-md' onClick={handleAddOptionInput}>Add Option</button>
                        </div>
                    </div>
                </div>
            )}
          </div>
          <div className='lg:grid grid-cols-3 gap-5 mx-5 '>
            {weightage && (
              <div className='flex gap-5'>
                <div className='flex flex-col'>
                  <label htmlFor="" className="font-semibold my-2"> Weightage</label>
                  <input type='text' placeholder='Enter Weightage' className='border p-1 px-4 border-gray-500 rounded-md'></input>
                </div>
                <div className='flex gap-3 mt-3'>
                  <input type='checkbox' className='mt-3' ></input>
                  <label htmlFor="" className="font-semibold mt-6">Rating</label>
                </div>
              </div>
            )}
            {section.reading && (
              <div className='flex gap-5'>
                <div className='flex flex-col'>
                  <label htmlFor="" className="font-semibold my-2"> Measure Type</label>
                  <select className="border p-1 px-4 border-gray-500 rounded-md" name="inputType">
                    <option value="">Select Input Type</option>
                  </select>
                </div>
              </div>
            )}
            {section.helpText && (
              <div className='flex gap-5'>
                <div className='flex flex-col'>
                  <label htmlFor="" className="font-semibold my-2">Help Text</label>
                  <input type='text' placeholder='Enter Help Text' className='border p-1 px-4 border-gray-500 rounded-md'></input>
                </div>
                <div className='flex gap-3 mt-3'>
                  <p className='text-sm mt-8 lg:hidden'>No Attachment</p>
                </div>
              </div>
            )}
          </div>
          {section.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <div className='md:grid grid-cols-6 gap-5 mx-5 my-5'>
                <div className="flex flex-col ">
                  <label htmlFor="" className="font-semibold my-2">Task</label>
                  <input
                    type="text"
                    placeholder="Enter Task"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                    name="task"
                    value={question.task}
                    onChange={(e) => handleQuestionInputChange(sectionIndex, questionIndex, e)}
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="" className="font-semibold my-2">Input Type</label>
                  <select
            id="select"
            name="type"
            value={section.type}
            onChange={(event) => handleSectionInputChange(sectionIndex, event)}
            className="border p-1 px-4 border-gray-500 rounded-md"
          >
            <option value="">Select Input Type</option>
            <option value="text">Text</option>
            <option value="dropDown">Drop Down</option>
            <option value="radioButton">Radio Button</option>
            <option value="checkBox">CheckBox</option>
            <option value="numeric">Numeric</option>
            <option value="multiline">Multiline</option>
            <option value="date">Date</option>
            <option value="optionInput">Option and Inputs</option>
          </select>
                </div>
                <div className="flex flex-col ">
                  <div className='lg:mt-8'>
                    <div className='flex gap-2'>
                      <label htmlFor="" className="font-semibold my-2">Mandatory</label>
                      <input type='checkbox' name='mandatory' checked={question.mandatory} onChange={(e) => handleQuestionInputChange(sectionIndex, questionIndex, e)}></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div className='lg:mt-8'>
                    <div className='flex gap-2'>
                      <label htmlFor="" className="font-semibold my-2">Reading</label>
                      <input type='checkbox' name='reading' checked={question.reading} onChange={(e) => handleQuestionInputChange(sectionIndex, questionIndex, e)}></input>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div className='lg:mt-8'>
                    <div className='flex gap-2'>
                      <label htmlFor="" className="font-semibold my-2">Help Text</label>
                      <input type='checkbox' name='helpText' checked={question.helpText} onChange={(e) => handleQuestionInputChange(sectionIndex, questionIndex, e)}></input>
                    </div>
                  </div>
                </div>
                <div className='flex justify-end mt-10 '>
                  <button onClick={() => handleRemoveQuestion(sectionIndex, questionIndex)}><FaTrash /></button>
                </div>
              </div>
              <div className='lg:grid grid-cols gap-5 mx-5'>
              {section.type === 'dropDown' && (
            <div>
              <div className="flex flex-col">
                <label className="font-semibold my-2">Selected Enter Value</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Yes"
                    name="value"
                    className="border p-1 px-4 border-gray-500 rounded-md"
                  />
                  <select className="border-2 border-black rounded-md p-1" name="select">
                    <option>Select</option>
                    <option value="P">P</option>
                    <option value="N">N</option>
                  </select>
                </div>
              </div>

              {section.selectDropDown.map((dropDown, dropDownIndex) => (
                <div key={dropDownIndex} className="grid md:grid-cols-3 items-start gap-x-4 gap-y-4 mb-3 w-full">
                  <div className="flex flex-col">
                    <label className="font-semibold my-2">Selected Enter Value</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="value"
                        placeholder="Yes"
                        value={dropDown.value}
                        onChange={(event) => handleInputChangeDropDown(sectionIndex, dropDownIndex, event)}
                        className="border p-1 px-4 border-gray-500 rounded-md"
                      />
                      <select
                        className="border-2 border-black rounded-md p-1"
                        name="select"
                        value={dropDown.select}
                        onChange={(event) => handleInputChangeDropDown(sectionIndex, dropDownIndex, event)}
                      >
                        <option>Select</option>
                        <option value="P">P</option>
                        <option value="N">N</option>
                      </select>
                    </div>
                  </div>
                  <div className="my-3">
                    <button onClick={() => handleRemoveDropDown(sectionIndex, dropDownIndex)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  className="border-2 border-black p-1 rounded-md"
                  onClick={(event) => handleAddDropDown(sectionIndex, event)}
                >
                  Add Option
                </button>
              </div>
            </div>
          )}
            {selectedValue === 'radioButton' && (
                <div className="section">
                     <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected Enter Value</label>
                          <div className='flex gap-3'>
                            <input
                                type="radio"
                                id="yes"
                                name='masterCheckList'
                                className="checked:accent-black"
                            />
                            <input
                              type="text"
                              placeholder="Yes"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                            <select className='border-2 border-black rounded-md p-1'>
                                <option>Select</option>
                                <option>P</option>
                                <option>N</option>
                            </select>
                            </div>
                        </div>
                        {selectRadioButton.map((radioButton, index) => (
                  <div key={index}>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                    <div className='flex flex-col'>
                     <label className="font-semibold my-2">Selected </label>
                     <div className='flex gap-3'>
                     <input
                        type="radio"
                        id="yes"
                        name='masterCheckList'
                        className="checked:accent-black"
                      />
                     <input
                        type="text"
                        placeholder="Yes"
                       className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                      <select className='border-2 border-black rounded-md p-1'>
                      <option>Select</option>
                      <option>P</option>
                        <option>N</option>
                       </select>
                      </div>
                        </div>
                     <div className='my-'>
                     <button onClick={() => handleRemoveRadioButton(index)}>
                        <FaTrash />
                      </button>
                     </div>
                    </div>
                  </div>
                ))}
                        <div className='flex justify-end'>
                            <button className='border-2 border-black p-1 rounded-md' onClick={handleAddRadioButton}>Add Option</button>
                        </div>
                </div>
            )}
            {selectedValue === 'checkBox' && (
                <div className="section">
                    <div>
                       <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected Enter Value</label>
                          <div className='flex gap-3'>
                            <input
                                type="checkbox"
                                id="yes"
                                name='masterCheckList'
                                className="checked:accent-black"
                            />
                            <input
                              type="text"
                              placeholder="Yes"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                            </div>
                        </div>
                        {selectCheckBox.map((checkBox, index) => (
                  <div key={index}>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                    <div className='flex flex-col'>
                     <label className="font-semibold my-2">Selected </label>
                     <div className='flex gap-3'>
                     <input
                        type="checkbox"
                        id="yes"
                        name='masterCheckList'
                        className="checked:accent-black"
                      />
                     <input
                        type="text"
                        placeholder="Yes"
                       className="border p-1 px-4 border-gray-500 rounded-md"
                       />
                      <select className='border-2 border-black rounded-md p-1'>
                      <option>Select</option>
                      <option>P</option>
                        <option>N</option>
                       </select>
                      </div>
                        </div>
                     <div className='my-3'>
                     <button onClick={() => handleRemoveCheckBox(index)}>
                        <FaTrash />
                      </button>
                     </div>
                    </div>
                  </div>
                ))}
                        <div className='flex justify-end'>
                            <button className='border-2 border-black p-1 rounded-md' onClick={handleAddCheckBox}>Add Option</button>
                        </div>
                    </div>
                </div>
            )}
            {selectedValue === 'numeric' && (
                <div className="section">
                    <div>
                       <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected measure type</label>
                          <div className='flex gap-3'>
                          <select className='border-2 border-black rounded-md p-1'>
                            <option>Select measure type</option>
                            <option>Consumption</option>
                            <option>Non Consumption</option>
                          </select>
                            </div>
                        </div>
                        {selectNumeric.map((numeric, index) => (
                  <div key={index}>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                    <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected measure type</label>
                          <div className='flex gap-3'>
                          <select className='border-2 border-black rounded-md p-1'>
                            <option>Select measure type</option>
                            <option>Consumption</option>
                            <option>Non Consumption</option>
                          </select>
                            </div>
                        </div>
                     <div className='my-3'>
                     <button onClick={() => handleRemoveNumeric(index)}>
                        <FaTrash />
                      </button>
                     </div>
                    </div>
                  </div>
                ))}
                        <div className='flex justify-end'>
                            <button className='border-2 border-black p-1 rounded-md' onClick={handleAddNumeric}>Add Option</button>
                        </div>
                    </div>
                </div>
            )}
            {selectedValue === 'optionInput' && (
                <div className="section">
                    <div>
                       <div className='flex flex-col'>
                            <label className="font-semibold my-2"> Enter Value</label>
                          <div className='flex gap-3'>
                            <input
                              type="text"
                              placeholder="Yes"
                              className="border p-1 px-4 border-gray-500 rounded-md"
                            />
                            </div>
                        </div>
                        {selectOptionInput.map((optionInput, index) => (
                  <div key={index}>
                    <div className='grid md:grid-cols-3 item-start gap-x-4 gap-y-4 mb-3 w-full'>
                    <div className='flex flex-col'>
                            <label className="font-semibold my-2">Selected measure type</label>
                          <div className='flex gap-3'>
                          <select className='border-2 border-black rounded-md p-1'>
                            <option>Select measure type</option>
                            <option>Consumption</option>
                            <option>Non Consumption</option>
                          </select>
                            </div>
                        </div>
                     <div className='my-3'>
                     <button onClick={() => handleRemoveOptionInput(index)}>
                        <FaTrash />
                      </button>
                     </div>
                    </div>
                  </div>
                ))}
                        <div className='flex justify-end'>
                            <button className='border-2 border-black p-1 rounded-md' onClick={handleAddOptionInput}>Add Option</button>
                        </div>
                    </div>
                </div>
            )}
          </div>
              {question.reading && (
                <div className='flex gap-5 mx-5'>
                  <div className='flex flex-col'>
                    <label htmlFor="" className="font-semibold my-2"> Measure Type</label>
                    <select className="border p-1 px-4 border-gray-500 rounded-md" name="inputType">
                      <option value="">Select Input Type</option>
                    </select>
                  </div>
                </div>
              )}
              {question.helpText && (
                <div className='flex gap-5 mx-5'>
                  <div className='flex flex-col'>
                    <label htmlFor="" className="font-semibold my-2">Help Text</label>
                    <input type='text' placeholder='Enter Help Text' className='border p-1 px-4 border-gray-500 rounded-md'></input>
                  </div>
                  <div className='flex gap-3 mt-3'>
                    <p className='text-sm mt-8 lg:hidden'>No Attachment</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className='flex justify-end mx-5 my-5'>
            <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md' onClick={(e) => handleAddQuestion(sectionIndex, e)}>
              <IoMdAdd /> Add Question
            </button>
          </div>
        </div>
                     ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddMasterCheckListSetup