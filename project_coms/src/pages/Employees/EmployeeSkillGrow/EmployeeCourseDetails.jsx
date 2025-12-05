import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { MdAccessTimeFilled, MdOutlineStar } from "react-icons/md";
import { PiStudent, PiVideoLight } from "react-icons/pi";
import { BsBarChart, BsPatchExclamation } from "react-icons/bs";
import { FaGlobe, FaRegCalendarAlt } from "react-icons/fa";
import { TbStars } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { LiaCertificateSolid } from "react-icons/lia";
import { BiDislike, BiLike } from "react-icons/bi";
import toast from "react-hot-toast";
import learning from "/learning.png";
function EmployeeCourseDetails() {
  const [openSection, setOpenSection] = useState("Course Description");
  const [courseContent, setCourseContent] = useState(null);
  const [faqIndex, setFaqIndex] = useState(null);
  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const CourseContentHandle = (index) => {
    setCourseContent(courseContent === index ? null : index);
  };

  const handleFaqToggle = (index) => {
    setFaqIndex(faqIndex === index ? null : index);
  };

  const ratingData = {
    averageRating: 4.5,
    totalReviews: 27,
    ratings: [
      { stars: 5, percentage: 50 },
      { stars: 4, percentage: 36 },
      { stars: 3, percentage: 9 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 },
    ],
  };

  const reviews = [
    {
      id: 1,
      name: "Max Hawkins",
      date: "2 Days ago",
      rating: 4.5,
      review:
        "Lectures were at a really good pace, and I never felt lost. The instructor was well-informed and allowed me to learn and navigate Lean Six Sigma concepts easily.",
    },
  ];

  const courseContentInfo = [
    {
      topic: "Introduction to Lean Six Sigma",
      ContentSubTopic: [
        {
          subTopic:
            "History and Timeline of Lean and Six Sigma Significance of LSS in Digital Transformation",
          time: "10m 10s",
        },
        {
          subTopic: "Industry Success Story",
          time: "12m 30s",
        },
        {
          subTopic: "Overview of DMAIC Framework",
          time: "15m 45s",
        },
      ],
    },
    {
      topic: "Define Phase",
      ContentSubTopic: [
        {
          subTopic: "Stakeholder Analysis",
          time: "15m 10s",
        },
        {
          subTopic: "Identify Opportunities for Innovation /Digitalization",
          time: "8m 30s",
        },
      ],
    },
    {
      topic: "Measure Phase",
      ContentSubTopic: [
        {
          subTopic: "Understanding Data",
          time: "45m 10s",
        },
        {
          subTopic: "Data Collection",
          time: "52m 30s",
        },
        {
          subTopic: "Measurement system validation",
          time: "20m 45s",
        },
        {
          subTopic: "Data Visualization",
          time: "5m 45s",
        },
      ],
    },
    {
      topic: "Analyze Phase",
      ContentSubTopic: [
        {
          subTopic: "Process Door Approach/Analyze of Process",
          time: "45m 10s",
        },
        {
          subTopic: "Statistical Based Decision Making: Hypothesis Testing",
          time: "52m 30s",
        },
        {
          subTopic:
            "Statistical Based Decision Making: Correlation, Regression and AI and ML",
          time: "30m 45s",
        },
        {
          subTopic: "Case Study",
          time: "5m 45s",
        },
      ],
    },
  ];
  const faqs = [
    {
      question: "What is the role of a Six Sigma Green Belt?",
      answer:
        "A Six Sigma Green Belt supports and leads process improvement projects within an organization. They work under the guidance of Black Belts and are responsible for implementing Six Sigma methodologies to reduce defects, improve quality, and optimize processes.",
    },
    {
      question:
        "What are the prerequisites for Six Sigma Green Belt certification?",
      answer:
        "Typically, there are no strict prerequisites for pursuing a Green Belt certification, but it is beneficial to have a basic understanding of process improvement and quality management. Some programs may recommend prior experience in a related field or completion of a Yellow Belt certification.",
    },
    {
      question:
        "What tools and techniques will I learn as a Six Sigma Green Belt?",
      answer:
        "As a Green Belt, you will learn tools and techniques such as DMAIC (Define, Measure, Analyze, Improve, Control), process mapping, statistical analysis, root cause analysis, Failure Mode and Effects Analysis (FMEA), and control charts.",
    },
    {
      question: "How does a Green Belt differ from a Black Belt in Six Sigma?",
      answer:
        "A Green Belt typically works on projects part-time and focuses on smaller-scale process improvements, while a Black Belt works full-time on Six Sigma projects and leads larger, more complex initiatives. Black Belts also have a deeper understanding of statistical analysis and project management.",
    },
    {
      question:
        "What career opportunities can I pursue with a Six Sigma Green Belt certification?",
      answer:
        "A Six Sigma Green Belt certification can open doors to various roles such as Process Improvement Specialist, Quality Analyst, Operations Manager, Project Manager, and more. It enhances your ability to contribute to organizational efficiency and quality improvement, making you a valuable asset in various industries.",
    },
  ];
  const [req, setReq] = useState(false);
  const handleRequest = () => {
    setReq(!req);
    if (!req) {
      toast.success("Course Requested Successfully!");
    } else {
      toast.success("Course Request Canceled");
    }
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden mb-10">
        <div className="flex my-2 w-full bg-gray-100">
          <div className="mx-5 my-5 w-full">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Lean Six Sigma Programme
                {/* Digital Marketing Course */}
              </h2>
              <h2 className="text-right font-medium ">
                <span className="rounded-full border px-4 p-1 text-green-600 bg-green-400 bg-opacity-30 border-green-600">
                  Level 3
                </span>
              </h2>
            </div>
            <p className=" font-medium mt-2">
              Hands on online simulation projects at every step to help you
              apply your learnings real time
            </p>
            <div className="flex flex-wrap gap-5 mt-2">
              <p className="flex gap-2">
                <MdOutlineStar className="text-yellow-400 my-1" size={20} />
                <span className="text-lg ">4.0/5.0</span>
              </p>
              <p className="flex gap-2">
                <PiStudent className="text-orange-400 my-1" size={20} />
                <span className="text-lg ">3K Enrolled</span>
              </p>
              <p className="flex gap-2">
                <BsBarChart className="text-green-400 " size={20} />
                <span className="text-lg ">All levels</span>
              </p>
              <p className="flex gap-2">
                <BsPatchExclamation className="text-red-400 my-1" size={20} />
                <span className="text-lg ">Last updated 07/2024</span>
              </p>
              <p className="flex gap-2">
                <FaGlobe className="my-1" size={20} />
                <span className="text-lg ">English</span>
              </p>
            </div>
          </div>
        </div>
        <div className="md:grid grid-cols-3 my-5 ">
          <div className="col-span-2">
            <div className="flex flex-wrap justify-between my-5 mx-5 shadow-custom-all-sides rounded-md p-2">
              <div
                className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${
                  openSection === "Course Description"
                    ? "bg-black text-white shadow-custom-all-sides"
                    : ""
                }`}
                onClick={() => handleToggle("Course Description")}
              >
                Description
              </div>
              <div
                className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${
                  openSection === "Curriculum"
                    ? "bg-black text-white shadow-custom-all-sides"
                    : ""
                }`}
                onClick={() => handleToggle("Curriculum")}
              >
                Curriculum
              </div>
              <div
                className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${
                  openSection === "Instructor"
                    ? "bg-black text-white shadow-custom-all-sides"
                    : ""
                }`}
                onClick={() => handleToggle("Instructor")}
              >
                Instructor
              </div>
              <div
                className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${
                  openSection === "Review"
                    ? "bg-black text-white shadow-custom-all-sides"
                    : ""
                }`}
                onClick={() => handleToggle("Review")}
              >
                Reviews
              </div>
              <div
                className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${
                  openSection === "FAQs"
                    ? "bg-black text-white shadow-custom-all-sides"
                    : ""
                }`}
                onClick={() => handleToggle("FAQs")}
              >
                FAQs
              </div>
            </div>
            <div className="border-b border-gray-300 mx-5 my-5 "></div>
            <div className="mx-5">
              {openSection === "Course Description" && (
                <div className="mt-2">
                  <div className="max-w-4xl mx-auto p-8 shadow-custom-all-sides rounded-md">
                    <h1 className="text-2xl font-bold text-center mb-6">
                      Lean Six Sigma Programme
                    </h1>
                    <div className="flex gap-3 mb-1">
                      <h2 className=" font-semibold">Duration:</h2>
                      <p className="">6 Weeks</p>
                    </div>
                    <div className="flex gap-3 mb-1">
                      <h2 className=" font-semibold">Format:</h2>
                      <p className="">Online, Self-Paced</p>
                    </div>
                    <p className="text-sm font-medium">
                      This Programme helps you enable to become a well-rounded
                      professional who develops a deep understanding on Lean Six
                      Sigma Green Belt concepts, to not just optimize business
                      processes but also gain insights on the applicability
                      aspect.
                    </p>

                    <div className="mb-6 mt-3">
                      <h2 className="text-xl font-semibold mb-1">
                        Course Highlights:
                      </h2>
                      <ul className="list-decimal list-inside space-y-2">
                        <li>
                          Overview of Lean Six Sigma & Digital Transformation
                        </li>
                        <li>Stakeholder Analysis</li>
                        <li>In Class Quiz Activity • Minitab Exercise</li>
                        <li>Principle of lean</li>
                        <li>Certification upon completion</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">
                        Key Learning Outcomes:
                      </h2>
                      <ul className="list-decimal list-inside space-y-2">
                        <li>Develop data-driven decision-making skills</li>
                        <li>Enhance problem-solving abilities.</li>
                        <li>
                          Gain expertise in managing Lean Six Sigma projects.
                        </li>
                        <li>Learn to manage and sustain change effectively.</li>
                        <li>
                          Acquire techniques for cost reduction and efficiency.
                        </li>
                        <li>Prepare for Lean Six Sigma certification exams.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">
                        Who should enroll for the programme?
                      </h2>
                      <ul className="list-decimal list-inside space-y-2">
                        <li>
                          Business Analysts who need to apply data-driven
                          approaches to problem-solving.
                        </li>
                        <li>
                          Managers and Supervisors seeking to improve process
                          efficiency and quality within their teams.
                        </li>
                        <li>
                          Supply Chain Managers aiming to optimize logistics and
                          inventory management.
                        </li>
                      </ul>
                    </div>
                    <div className="flex w-full justify-center">
                    {/* <div className="flex w-full justify-center"> */}
                      <img
                        src={learning}
                        alt="learning"
                        className="rounded-xl "
                        // className="rounded-xl w-96"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mx-5">
              {openSection === "Curriculum" && (
                <div className="mt-2">
                  <div className="max-w-4xl mx-auto p-8 shadow-custom-all-sides rounded-md">
                    <h1 className="text-3xl font-bold text-center mb-6">
                      Course content
                    </h1>
                    <div>
                      {courseContentInfo.map((item, index) => (
                        <div
                          key={index}
                          className="border-2 border-gray-400 rounded-md mb-4"
                        >
                          <div
                            className="p-2 cursor-pointer flex justify-between items-center"
                            onClick={() => CourseContentHandle(index)}
                          >
                            <h2 className="text-lg">{item.topic}</h2>
                            <span>{courseContent === index ? "-" : "+"}</span>
                          </div>
                          {courseContent === index && (
                            <div className="p-4 bg-gray-100">
                              {item.ContentSubTopic.map((sub, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="flex justify-between mb-2"
                                >
                                  <div className="flex gap-2">
                                    <PiVideoLight className="mt-1" size={20} />
                                    <h2>{sub.subTopic}</h2>
                                  </div>
                                  <h2>{sub.time}</h2>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mx-5">
              {openSection === "Instructor" && (
                <div className="mt-2 shadow-custom-all-sides rounded-md px-5 py-5">
                  <div className="flex">
                    <div>
                      <img src="/profile.png" className="w-40 h-40"></img>
                    </div>
                    <div className="ml-2 mt-5">
                      <h2>Anil Sharma</h2>
                      <p className="flex gap-2">
                        <MdOutlineStar
                          className="text-yellow-400 my-1"
                          size={20}
                        />
                        <span className="text-lg ">4.0</span>
                      </p>
                      <p className="flex gap-2">
                        <PiStudent className="text-orange-400 my-1" size={20} />
                        <span className="text-lg ">5K Students</span>
                      </p>
                      <p className="flex gap-2">
                        <TbStars className="text-gray-400 my-1" size={20} />
                        <span className="text-lg ">1K Review</span>
                      </p>
                      <p className="flex gap-2">
                        <PiVideoLight className="text-red-400 my-1" size={20} />
                        <span className="text-lg ">7 course</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-gray-700 mt-2 mx-5">
                    With a robust rating of 4.0 and a track record of
                    successfully guiding 5,000 students, Anil Sharma is a
                    distinguished expert not only in digital marketing but now
                    also in Lean Six Sigma. His courses, totaling 7 in number,
                    have garnered over 1,000 reviews, reflecting the impact and
                    value he brings to his students across disciplines. Anil’s
                    approach to Lean Six Sigma education is both practical and
                    insightful, equipping learners with the essential skills
                    needed to excel in process improvement and operational
                    excellence. Whether you’re new to Lean Six Sigma or looking
                    to deepen your expertise, Anil Sharma’s proven teaching
                    methods and cross-functional experience offer a valuable
                    resource for achieving your goals in today’s competitive
                    landscape.
                  </p>
                </div>
              )}
            </div>
            <div className="mx-5">
              {openSection === "Review" && (
                <div className="mx-auto p-6 shadow-custom-all-sides rounded-md">
                  <h2 className="text-xl font-semibold mb-2">
                    How students rated this course
                  </h2>
                  <div className="grid grid-cols-2">
                    <div className="mb-6 col-span-1">
                      <div className="text-6xl font-bold">
                        {ratingData.averageRating}
                      </div>
                      <div className="text-yellow-500">
                        {"★".repeat(Math.round(ratingData.averageRating))}
                        {"☆".repeat(5.0 - Math.round(ratingData.averageRating))}
                      </div>
                    </div>
                    <div className="mb-6 col-span-10">
                      {ratingData.ratings.map((rating) => (
                        <div
                          key={rating.stars}
                          className="flex items-center mb-1"
                        >
                          <div className="flex-1 flex items-center">
                            <span className="text-yellow-500">
                              {"★".repeat(rating.stars)}
                            </span>
                            <span className="ml-2 text-gray-600">
                              {rating.percentage}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 ml-2">
                            <div
                              className="h-full bg-yellow-500"
                              style={{ width: `${rating.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
                    {reviews.map((review) => (
                      <div key={review.id} className="mb-6">
                        <div className="flex items-center mb-2">
                          <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={`/profile.png`}
                            alt={review.name}
                          />
                          <div>
                            <div className="font-semibold">{review.name}</div>
                            <div className="text-gray-500 text-sm">
                              {review.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="text-yellow-500">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                        </div>
                        <div className="text-gray-700">{review.review}</div>
                        <div className="flex items-center mt-2">
                          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2">
                            <BiLike />
                          </button>
                          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
                            <BiDislike />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mx-5">
              {openSection === "FAQs" && (
                <div className="mt-2">
                  <div className="max-w-4xl mx-auto p-8 shadow-custom-all-sides rounded-md">
                    <h1 className="text-2xl font-semibold text-center mb-6">
                      Frequently Asked Questions
                    </h1>
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border-2 border-gray-400 rounded-md mb-4"
                      >
                        <div
                          className="p-2 cursor-pointer flex justify-between items-center"
                          onClick={() => handleFaqToggle(index)}
                        >
                          <h2 className="text-lg">{faq.question}</h2>
                          <span>{faqIndex === index ? "-" : "+"}</span>
                        </div>
                        {faqIndex === index && (
                          <div className="p-4 bg-gray-100">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 mx-2 my-5">
            <div className="shadow-custom-all-sides rounded-md px-5 py-2">
              <h2 className="text-2xl font-semibold">This course includes</h2>
              <h2 className="text-lg font-medium my-3">₹ 3000</h2>
              <div className="flex justify-between mt-1">
                <div className="flex gap-2">
                  <IoBookOutline className="mt-1" />
                  <h2>Lectures</h2>
                </div>
                <p>30</p>
              </div>
              <div className="flex justify-between mt-1">
                <div className="flex gap-2">
                  <MdAccessTimeFilled className="mt-1" />
                  <h2>Duration</h2>
                </div>
                <p>6 weeks</p>
              </div>
              <div className="flex justify-between mt-1">
                <div className="flex gap-2">
                  <BsBarChart className="mt-1" />
                  <h2>Skills</h2>
                </div>
                <p>All User</p>
              </div>
              <div className="flex justify-between mt-1">
                <div className="flex gap-2">
                  <FaGlobe className="mt-1" />
                  <h2>Language</h2>
                </div>
                <p>English</p>
              </div>
              <div className="flex justify-between mt-1">
                <div className="flex gap-2">
                  <FaRegCalendarAlt className="mt-1" />
                  <h2>Deadline</h2>
                </div>
                <p>Nov 30 2021</p>
              </div>
              <div className="flex justify-between mt-1">
                <div className="flex gap-2">
                  <LiaCertificateSolid className="mt-1" />
                  <h2>Certificate</h2>
                </div>
                <p>Yes</p>
              </div>
              <div className="py-5">
                <button
                  onClick={handleRequest}
                  className="border-2 border-gray-400 rounded-md p-2 px-10 hover:bg-black hover:text-white"
                >
                  {req ? "Requested" : "Request"}
                </button>
              </div>
            </div>
            <div className="shadow-custom-all-sides rounded-md px-5 py-5 my-5">
              <h2 className=" font-semibold mb-3">
                Requirements for the Session
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>A laptop/desktop with a good audio system</li>
                <li>A strong and stable WI-Fi connectivity</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeCourseDetails;
