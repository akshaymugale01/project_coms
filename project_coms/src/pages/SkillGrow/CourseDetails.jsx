import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { MdAccessTimeFilled, MdOutlineStar } from 'react-icons/md';
import { PiStudent, PiVideoLight } from 'react-icons/pi';
import { BsBarChart, BsPatchExclamation } from 'react-icons/bs';
import { FaGlobe, FaRegCalendarAlt } from 'react-icons/fa';
import { TbStars } from 'react-icons/tb';
import { IoBookOutline } from 'react-icons/io5';
import { LiaCertificateSolid } from "react-icons/lia";
import { BiDislike, BiLike } from "react-icons/bi";
function CourseDetails() {
  const [openSection, setOpenSection] = useState('Course Description');
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
      name: 'Max Hawkins',
      date: '2 Days ago',
      rating: 4.5,
      review: 'Lectures were at a really good pace and I never felt lost. The instructor was well informed and allowed me to learn and navigate Figma easily.',
    },
  ];

  const courseContentInfo = [{
    topic: "Introduction of Digital Marketing",
    ContentSubTopic: [
      {
        subTopic: "Introduction",
        time: "10m 10s"
      },
      {
        subTopic: "SEO Basics",
        time: "12m 30s"
      },
      {
        subTopic: "Content Marketing",
        time: "15m 45s"
      },
    ]
  },
  {
    topic: "Search Engine Optimization (SEO):",
    ContentSubTopic: [
      {
        subTopic: "On-page and off-page SEO",
        time: "15m 10s"
      },
      {
        subTopic: "Keyword research and strategy",
        time: "8m 30s"
      },
      {
        subTopic: "Technical SEO",
        time: "15m 45s"
      },
    ]
  },
  {
    topic: "Content Marketing:",
    ContentSubTopic: [
      {
        subTopic: "Content creation and strategy",
        time: "10m 10s"
      },
      {
        subTopic: "Blogging and article writing",
        time: "12m 30s"
      },
      {
        subTopic: "Video and multimedia content",
        time: "20m 45s"
      },
      {
        subTopic: "Content distribution and promotion",
        time: "5m 45s"
      },
    ]
  },
];
const faqs = [
  {
    question: "How does Digital Marketing Work?",
    answer: "Digital marketing involves the use of digital channels, such as social media, email, and search engines, to promote products and services. It includes strategies like SEO, content marketing, and PPC advertising to reach and engage with potential customers."
  },
  {
    question: "What is SEO?",
    answer: "SEO, or Search Engine Optimization, is the process of optimizing your website to rank higher in search engine results pages (SERPs). This involves optimizing content, improving site structure, and building backlinks to increase visibility and drive organic traffic."
  },
  {
    question: "Who should join this course?",
    answer: "This course is ideal for marketing professionals, entrepreneurs, small business owners, and anyone interested in learning digital marketing strategies to enhance their business or career."
  },
  {
    question: "What are the terms and conditions for this program?",
    answer: "The terms and conditions include adherence to the course schedule, participation in all modules, and completion of assignments. Refund policies, course access periods, and certification requirements are also outlined in the program details."
  },
  {
    question: "What certificates will be received for this program?",
    answer: "Upon successful completion of the course, participants will receive a certificate of completion that validates their knowledge and skills in digital marketing. This certificate can be used to enhance resumes and demonstrate expertise to employers or clients."
  }
];

  return (
    <section className='flex'>
      <Navbar />
      <div className='w-full flex flex-col overflow-hidden'>
        <div className="flex justify-between my-2 w-full bg-gray-100">
          <div className='mx-10 my-5'>
            <h2 className='text-xl font-semibold'>Digital Marketing Course</h2>
            <p className=' font-medium mt-2'>The Complete Digital Marketing Course - 12 Courses in 1</p>
            <div className='flex flex-wrap gap-5 mt-2'>
              <p className='flex gap-2'><MdOutlineStar className='text-yellow-400 my-1' size={20} /><span className='text-lg '>4.0/5.0</span></p>
              <p className='flex gap-2'><PiStudent className='text-orange-400 my-1' size={20} /><span className='text-lg '>3K Enrolled</span></p>
              <p className='flex gap-2'><BsBarChart className='text-green-400 ' size={20} /><span className='text-lg '>All levels</span></p>
              <p className='flex gap-2'><BsPatchExclamation className='text-red-400 my-1' size={20} /><span className='text-lg '>Last updated 07/2024</span></p>
              <p className='flex gap-2'><FaGlobe className='my-1' size={20} /><span className='text-lg '>English</span></p>
            </div>
          </div>
          <div>
            <h2 className='bg-green-100 text-green-500 rounded-md p-1 px-5 my-5 mx-5 font-semibold'>Level 3</h2>
          </div>
        </div>
        <div className='md:grid grid-cols-3 mb-5 gap-5 mx-5'>
          <div className='col-span-2'>
            <div className="flex flex-wrap justify-between my-5 shadow-custom-all-sides rounded-md py-3 px-3">
              <div className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${openSection === 'Course Description' ? 'bg-black text-white shadow-custom-all-sides' : ''}`}
                onClick={() => handleToggle('Course Description')}>
                Description
              </div>
              <div className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${openSection === 'Curriculum' ? 'bg-black text-white shadow-custom-all-sides' : ''}`}
                onClick={() => handleToggle('Curriculum')}>
                Curriculum
              </div>
              <div className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${openSection === 'Instructor' ? 'bg-black text-white shadow-custom-all-sides' : ''}`}
                onClick={() => handleToggle('Instructor')}>
                Instructor
              </div>
              <div className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${openSection === 'Review' ? 'bg-black text-white shadow-custom-all-sides' : ''}`}
                onClick={() => handleToggle('Review')}>
                Reviews
              </div>
              <div className={`rounded-md p-3 px-5 text-center cursor-pointer transition-all duration-300 ease-linear ${openSection === 'FAQs' ? 'bg-black text-white shadow-custom-all-sides' : ''}`}
                onClick={() => handleToggle('FAQs')}>
                FAQs
              </div>
            </div>
            <div className='border-b border-gray-300 mx-5 my-5'></div>
            <div className='my-5'>
              {openSection === 'Course Description' &&
                <div className='mt-2'>
                  <div className=" p-8 shadow-custom-all-sides rounded-md">
                    <h1 className="text-3xl font-bold text-center mb-6">Digital Marketing</h1>
                    <div className="flex gap-3 mb-1">
                      <h2 className="text-xl font-semibold">Duration:</h2>
                      <p className='text-lg'>6 Weeks</p>
                    </div>
                    <div className="flex gap-3 mb-1">
                      <h2 className="text-lg font-semibold">Format:</h2>
                      <p className='text-lg'>Online, Self-Paced</p>
                    </div>
                    <div className="mb-6 mt-3">
                      <h2 className="text-xl font-semibold mb-1">Course Highlights:</h2>
                      <ul className="list-decimal list-inside space-y-2">
                        <li>Comprehensive introduction to digital marketing strategies</li>
                        <li>In-depth modules on SEO, content marketing, social media marketing, email marketing, PPC advertising</li>
                        <li>Hands-on projects and real-world case studies</li>
                        <li>Interactive video lessons, quizzes, and assessments</li>
                        <li>Certification upon completion</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Key Learning Outcomes:</h2>
                      <ul className="list-decimal list-inside space-y-2">
                        <li>Develop and execute effective digital marketing plans</li>
                        <li>Optimize websites for search engines</li>
                        <li>Create engaging content across multiple platforms</li>
                        <li>Utilize social media for business growth</li>
                        <li>Run successful email and PPC campaigns</li>
                        <li>Analyze and report on marketing performance</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Target Audience:</h2>
                      <ul className="list-decimal list-inside space-y-2">
                        <li>Marketing professionals</li>
                        <li>Entrepreneurs and small business owners</li>
                        <li>Individuals looking to upskill in digital marketing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className='my-5'>
              {openSection === 'Curriculum' &&
                <div className='mt-2'>
                  <div className=" p-8 shadow-custom-all-sides rounded-md">
                    <h1 className="text-3xl font-bold text-center mb-6">Course content</h1>
                    <div>
                      {courseContentInfo.map((item, index) => (
                        <div key={index} className='border-2 border-gray-400 rounded-md mb-4'>
                          <div className='p-2 cursor-pointer flex justify-between items-center'
                            onClick={() => CourseContentHandle(index)}>
                            <h2 className='text-lg'>{item.topic}</h2>
                            <span>{courseContent === index ? '-' : '+'}</span>
                          </div>
                          {courseContent === index && (
                            <div className='p-4 bg-gray-100'>
                              {item.ContentSubTopic.map((sub, subIndex) => (
                                <div key={subIndex} className='flex justify-between mb-2'>
                                  <div className='flex gap-2'>
                                    <PiVideoLight className='mt-1' size={20} />
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
              }
            </div>
            <div className='my-5'>
              {openSection === 'Instructor' &&
                <div className='mt-2 shadow-custom-all-sides rounded-md px-5 py-5'>
                 <div className='flex'>
                  <div>
                    <img src='/profile.png' className='w-40 h-40'></img>
                  </div>
                  <div className='ml-2 mt-5'>
                    <h2>Anil Sharma</h2>
                    <p className='flex gap-2'><MdOutlineStar className='text-yellow-400 my-1' size={20} /><span className='text-lg '>4.0</span></p>
                    <p className='flex gap-2'><PiStudent className='text-orange-400 my-1' size={20} /><span className='text-lg '>5K Students</span></p>
                    <p className='flex gap-2'><TbStars  className='text-gray-400 my-1' size={20} /><span className='text-lg '>1K Review</span></p>
                    <p className='flex gap-2'><PiVideoLight className='text-red-400 my-1' size={20} /><span className='text-lg '>7 course</span></p>
                  </div>
                 </div>
                 <p className='text-base text-gray-700 mt-2 mx-5'>
                  With a robust rating of 4.0 and a track record of successfully guiding 5,000 students, 
                  Anil Sharma is a distinguished expert in digital marketing. His courses, totaling 7 in number, have garnered over 1,000 reviews, reflecting his impact and the value he brings to his students.
                  Anil’s approach to digital marketing education is both practical and insightful, equipping learners with the skills needed to excel in the fast-paced digital landscape. Whether you’re just starting or looking to refine your marketing strategies, Anil Sharma’s expertise and proven teaching methods offer a valuable resource for achieving your goals.
                 </p>
                </div>
              }
            </div>
            <div className='my-5'>
              {openSection === 'Review' &&
                <div className="mx-auto p-6 shadow-custom-all-sides rounded-md">
                  <h2 className="text-xl font-semibold mb-2">How students rated this course</h2>
                  <div className='grid grid-cols-2'>
                  <div className="mb-6 col-span-1">
                    <div className="text-6xl font-bold">{ratingData.averageRating}</div>
                    <div className="text-yellow-500">
                      {'★'.repeat(Math.round(ratingData.averageRating))}
                      {'☆'.repeat(5.0 - Math.round(ratingData.averageRating))}
                    </div>
                  </div>
                  <div className="mb-6 col-span-10">
                  {ratingData.ratings.map((rating) => (
                    <div key={rating.stars} className="flex items-center mb-1">
                      <div className="flex-1 flex items-center">
                        <span className="text-yellow-500">{'★'.repeat(rating.stars)}</span>
                        <span className="ml-2 text-gray-600">{rating.percentage}%</span>
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
                          <div className="text-gray-500 text-sm">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="text-yellow-500">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
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
              }
            </div>
            <div className='my-5'>
              {openSection === 'FAQs' &&
                <div className='mt-2'>
                  <div className="p-8 shadow-custom-all-sides rounded-md">
                    <h1 className="text-2xl font-semibold text-center mb-6">Frequently Asked Questions</h1>
                    {faqs.map((faq, index) => (
                      <div key={index} className='border-2 border-gray-400 rounded-md mb-4'>
                        <div className='p-2 cursor-pointer flex justify-between items-center' onClick={() => handleFaqToggle(index)}>
                          <h2 className='text-lg'>{faq.question}</h2>
                          <span>{faqIndex === index ? '-' : '+'}</span>
                        </div>
                        {faqIndex === index && (
                          <div className='p-4 bg-gray-100'>
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
          <div className='col-span-1 my-5'>
            <div className='shadow-custom-all-sides rounded-md px-5 py-5'>
              <h2 className='text-2xl font-semibold'>This course includes</h2>
              <h2 className='text-lg font-medium my-3'>₹ 3000</h2>
              <div className='flex justify-between mt-1'>
              <div className='flex gap-2'>
              <IoBookOutline className='mt-1'/><h2>Lectures</h2>
              </div>
                <p>30</p>
              </div>
              <div className='flex justify-between mt-1'>
                <div className='flex gap-2'>
                 <MdAccessTimeFilled className='mt-1'/><h2>Duration</h2>
                </div>
                <p>42 Days</p>
              </div>
              <div className='flex justify-between mt-1'>
                <div className='flex gap-2'>
                 <BsBarChart className='mt-1'/><h2>Skills</h2>
                </div>
                <p>All User</p>
              </div>
              <div className='flex justify-between mt-1'>
                <div className='flex gap-2'>
                <FaGlobe className='mt-1'/><h2>Language</h2>
                </div>
                <p>English</p>
              </div>
              <div className='flex justify-between mt-1'>
              <div className='flex gap-2'>
                <FaRegCalendarAlt className='mt-1'/><h2>Deadline</h2>
              </div>
                <p>Nov 30 2021</p>
              </div>
              <div className='flex justify-between mt-1'>
                <div className='flex gap-2'>
                  <LiaCertificateSolid className='mt-1'/><h2>Certificate</h2>
                </div>
                <p>Yes</p>
              </div>
            </div>
            <div className='shadow-custom-all-sides rounded-md px-5 py-5 my-5'>
              <h2 className='text-2xl font-semibold mb-3'>Digital Marketing Requirements</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>No prior experience needed - I'll teach you everything you need to know</li>
                <li>A computer with access to the internet</li>
                <li>No paid software required</li>
                <li>I'll walk you through, step-by-step, how to get all the necessary software installed and set up</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CourseDetails