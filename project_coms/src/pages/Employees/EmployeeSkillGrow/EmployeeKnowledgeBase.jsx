import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EmployeeKnowledgeBase() {
  const themeColor = useSelector((state) => state.theme.color);
  const [openSection, setOpenSection] = useState('Top Question');
  const [openBusinessRules, setOpenBusinessRules] = useState(null);
  const [openSecurity, setOpenSecurity] = useState(null);
  const [openReporting, setOpenReporting] = useState(null);
  const [openAccounts, setOpenAccounts] = useState(null);
  const [openIntegrations, setOpenIntegrations] = useState(null);
  const [openTickets, setOpenTickets] = useState(null);

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleBusinessRuleToggle = (index) => {
    setOpenBusinessRules(openBusinessRules === index ? null : index);
  };

  const handleSecurityToggle = (index) => {
    setOpenSecurity(openSecurity === index ? null : index);
  };

  const handleReportingToggle = (index) => {
    setOpenReporting(openReporting === index ? null : index);
  };

  const handleAccountsToggle = (index) => {
    setOpenAccounts(openAccounts === index ? null : index);
  };

  const handleIntegrationsToggle = (index) => {
    setOpenIntegrations(openIntegrations === index ? null : index);
  };

  const handleTicketsToggle = (index) => {
    setOpenTickets(openTickets === index ? null : index);
  };

  const businessRules = [
    {
      title: "What is the purpose of focusing on employee skill growth?",
      answers: [
        "The primary purpose of emphasizing employee skill growth is to ensure that our workforce remains adaptable, capable of meeting evolving business needs, and equipped with the necessary competencies to drive innovation and competitiveness."
      ]
    },
    {
      title: "How often should employee skills be assessed for growth?",
      answers: [
        " Employee skills should be assessed regularly, typically during annual performance reviews or more frequently if there are significant changes in job roles or responsibilities."
      ]
    }
  ];

  const security = [
    {
      title: "How can employees integrate security practices into project management processes?",
      answers: [
        "Employees can integrate security practices into project management by conducting risk assessments at project initiation, ensuring security requirements are included in project plans, and incorporating secure coding practices and testing throughout the development lifecycle."
      ]
    },
    {
      title: "How does project management contribute to improving security posture?",
      answers: [
        " Effective project management contributes to improving security posture by ensuring that security considerations are integrated into project planning, implementation, and evaluation phases. It facilitates proactive identification and mitigation of security risks and ensures alignment with organizational security goals."
      ]
    }
  ];

  const reporting = [
    {
      title: "How do i forward upcoming email ?",
      answers: [
        "Open the Email: Locate the email you want to forward in your inbox.",
        "Select Forward: There should be an option to forward the email. Usually, it's represented by an arrow pointing right or a Forward button.",
        "Enter Recipient: Enter the email address of the person you want to forward the email to in the To field.",
        "Add a Message (Optional): You can include a message to the recipient explaining why you're forwarding the email or providing context.",
        "Send Click the Send button or equivalent to forward the email"
      ]
    }
  ];

  const accounts = [
    {
      title: "How do I update my billing information?",
      answers: [
        "Go to the account settings.",
        "Click on 'Billing Information'.",
        "Update your credit card or bank details.",
        "Save the changes."
      ]
    }
  ];

  const integrations = [
    {
      title: "How do I integrate with Slack?",
      answers: [
        "Go to the integrations page.",
        "Select Slack from the list of available integrations.",
        "Follow the instructions to authorize and connect your Slack account."
      ]
    }
  ];

  const tickets = [
    {
      title: "How do I submit a support ticket?",
      answers: [
        "Go to the support section.",
        "Click on 'Submit Ticket'.",
        "Fill in the required details and click 'Submit'."
      ]
    }
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex flex-wrap grid grid-cols-2 sm:flex-row gap-2 text-sm font-medium p-2 rounded-md  text-white" style={{ background: themeColor }}>
            <NavLink
              to={"/employee/certificate/course"}
              className={({ isActive }) => `p-1 ${isActive && "bg-white text-blue-500 shadow-custom-all-sides"} rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/rr-certificate"}
              className={({ isActive }) => `p-1 ${isActive && "bg-white text-blue-500 shadow-custom-all-sides"} rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              RR Certificate
            </NavLink>
            <NavLink
              to={"/employee/certificate/course-request-approval"}
              className={({ isActive }) => `p-1 ${isActive && "bg-white text-blue-500 shadow-custom-all-sides"} rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Course Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-request-approval/request"}
              className={({ isActive }) => `p-1 ${isActive && "bg-white text-blue-500 shadow-custom-all-sides"} rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Request & Approval
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-tracking"}
              className={({ isActive }) => `p-1 ${isActive && "bg-white text-blue-500 shadow-custom-all-sides"} rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Tracking
            </NavLink>
            <NavLink
              to={"/employee/certificate/project-repository"}
              className={({ isActive }) => `p-1 ${isActive && "bg-white text-blue-500 shadow-custom-all-sides"} rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Project Repository
            </NavLink>
            <NavLink
              to={"/employee/certificate/knowledge-base"}
              className={({ isActive }) => `p-1 ${isActive && "bg-white text-blue-500 shadow-custom-all-sides"} rounded-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            >
              Knowledge Base
            </NavLink>
          </div>
        </div>
        <div className="mx-4 flex flex-wrap gap-2 my-2">
          <div className={`border border-gray-400 rounded-md p-2 px-4 text-sm text-center cursor-pointer transition-all duration-300 ease-linear w-36 ${openSection === 'Top Question' ? 'bg-black text-white shadow-custom-all-sides' : ''}`} 
               onClick={() => handleToggle('Top Question')}>
            Top Question
          </div>
          <div className={`border border-gray-400 rounded-md p-2 px-4 text-sm text-center cursor-pointer transition-all duration-300 ease-linear w-40 ${openSection === 'Business Rules' ? 'bg-black text-white shadow-custom-all-sides' : ''}`} 
               onClick={() => handleToggle('Business Rules')}>
            Business Rules
          </div>
          <div className={`border border-gray-400 rounded-md p-2 px-4 text-sm text-center cursor-pointer transition-all duration-300 ease-linear w-40 ${openSection === 'Security' ? 'bg-black text-white shadow-custom-all-sides' : ''}`} 
               onClick={() => handleToggle('Security')}>
            Security
          </div>
          <div className={`border border-gray-400 rounded-md p-2 px-4 text-sm text-center cursor-pointer transition-all duration-300 ease-linear w-40 ${openSection === 'Reporting' ? 'bg-black text-white shadow-custom-all-sides' : ''}`} 
               onClick={() => handleToggle('Reporting')}>
            Reporting
          </div>
          <div className={`border border-gray-400 rounded-md p-2 px-4 text-sm text-center cursor-pointer transition-all duration-300 ease-linear w-40 ${openSection === 'Accounts' ? 'bg-black text-white shadow-custom-all-sides' : ''}`} 
               onClick={() => handleToggle('Accounts')}>
            Accounts
          </div>
          <div className={`border border-gray-400 rounded-md p-2 px-4 text-sm text-center cursor-pointer transition-all duration-300 ease-linear w-40 ${openSection === 'Integrations' ? 'bg-black text-white shadow-custom-all-sides' : ''}`} 
               onClick={() => handleToggle('Integrations')}>
            Integrations
          </div>
          <div className={`border border-gray-400 rounded-md p-2 px-4 text-sm text-center cursor-pointer transition-all duration-300 ease-linear w-40 ${openSection === 'Tickets' ? 'bg-black text-white shadow-custom-all-sides' : ''}`} 
               onClick={() => handleToggle('Tickets')}>
            Tickets
          </div>
        </div>
        <div className="flex justify-start mx-5 my-2">
          <input
            type="text"
            placeholder="search"
            className="border p-2 w-full border-gray-300 rounded-lg"
          />
        </div>
        <div className='mx-5 mb-10'>
          {openSection === 'Top Question' && <div className='mt-2'>
            <div className="grid md:grid-cols-3 gap-5">
              <div className='border border-gray-400 rounded-md cursor-pointer' onClick={() => handleToggle('Business Rules')}>
                <div className='px-5 py-5 space-y-3'>
                  <h2 className='text-3xl font-semibold'>Business Rules</h2>
                  <p className='text-lg'> What is the purpose of focusing on</p>
                  <p className='text-lg'> How often should employee skills be assessed for growth?</p>
                </div>
              </div>
              <div className='border border-gray-400 rounded-md cursor-pointer' onClick={() => handleToggle('Security')}>
                <div className='px-5 py-5 space-y-3'>
                  <h2 className='text-3xl font-semibold'>Security</h2>
                  <p className='text-lg'> How do i use whitelist and blacklist to control access ?</p>
                  <p className='text-lg'> What Supports default Trigger ?</p>
                </div>
              </div>
              <div className='border border-gray-400 rounded-md cursor-pointer' onClick={() => handleToggle('Reporting')}>
                <div className='px-5 py-5 space-y-3'>
                  <h2 className='text-3xl font-semibold'>Reporting</h2>
                  <p className='text-lg'> What are the difference between automations and triggers ?</p>
                  <p className='text-lg'> What supports default Trigger ?</p>
                </div>
              </div>
              <div className='border border-gray-400 rounded-md cursor-pointer' onClick={() => handleToggle('Accounts')}>
                <div className='px-5 py-5 space-y-3'>
                  <h2 className='text-3xl font-semibold'>Accounts</h2>
                  <p className='text-lg'> How to download invoices ?</p>
                  <p className='text-lg'> How can i change Owner of my support Account ?</p>
                </div>
              </div>
              <div className='border border-gray-400 rounded-md cursor-pointer' onClick={() => handleToggle('Integrations')}>
                <div className='px-5 py-5 space-y-3'>
                  <h2 className='text-3xl font-semibold'>Integrations</h2>
                  <p className='text-lg'> What are the difference between automations and triggers ?</p>
                  <p className='text-lg'> What supports default Trigger ?</p>
                </div>
              </div>
              <div className='border border-gray-400 rounded-md cursor-pointer' onClick={() => handleToggle('Tickets')}>
                <div className='px-5 py-5 space-y-3'>
                  <h2 className='text-3xl font-semibold'>Tickets</h2>
                  <p className='text-lg'> What are the difference between automations and triggers ?</p>
                  <p className='text-lg'> What supports default Trigger ?</p>
                </div>
              </div>
            </div>
          </div>}
          {openSection === 'Business Rules' && <div className='mt-2'>
            <div>
              {businessRules.map((rule, index) => (
                <div key={index} className='border-2 border-gray-400 rounded-md mb-4'>
                  <div
                    className='p-2 cursor-pointer flex justify-between items-center'
                    onClick={() => handleBusinessRuleToggle(index)}
                  >
                    <h2 className='text-lg'>{rule.title}</h2>
                    <span>{openBusinessRules === index ? '-' : '+'}</span>
                  </div>
                  {openBusinessRules === index && (
                    <div className='p-4 bg-gray-100'>
                      {rule.answers.map((answer, idx) => (
                        <p key={idx} className='mb-2'>{answer}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>}
          {openSection === 'Security' && <div className='mt-2'>
            <div>
              {security.map((item, index) => (
                <div key={index} className='border-2 border-gray-400 rounded-md mb-4'>
                  <div
                    className='p-2 cursor-pointer flex justify-between items-center'
                    onClick={() => handleSecurityToggle(index)}
                  >
                    <h2 className='text-lg'>{item.title}</h2>
                    <span>{openSecurity === index ? '-' : '+'}</span>
                  </div>
                  {openSecurity === index && (
                    <div className='p-4 bg-gray-100'>
                      {item.answers.map((answer, idx) => (
                        <p key={idx} className='mb-2'>{answer}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>}
          {openSection === 'Reporting' && <div className='mt-2'>
            <div>
              {reporting.map((item, index) => (
                <div key={index} className='border-2 border-gray-400 rounded-md mb-4'>
                  <div
                    className='p-2 cursor-pointer flex justify-between items-center'
                    onClick={() => handleReportingToggle(index)}
                  >
                    <h2 className='text-lg'>{item.title}</h2>
                    <span>{openReporting === index ? '-' : '+'}</span>
                  </div>
                  {openReporting === index && (
                    <div className='p-4 bg-gray-100'>
                      {item.answers.map((answer, idx) => (
                        <p key={idx} className='mb-2'>{answer}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>}
          {openSection === 'Accounts' && <div className='mt-2'>
            <div>
              {accounts.map((item, index) => (
                <div key={index} className='border-2 border-gray-400 rounded-md mb-4'>
                  <div
                    className='p-2 cursor-pointer flex justify-between items-center'
                    onClick={() => handleAccountsToggle(index)}
                  >
                    <h2 className='text-lg'>{item.title}</h2>
                    <span>{openAccounts === index ? '-' : '+'}</span>
                  </div>
                  {openAccounts === index && (
                    <div className='p-4 bg-gray-100'>
                      {item.answers.map((answer, idx) => (
                        <p key={idx} className='mb-2'>{answer}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>}
          {openSection === 'Integrations' && <div className='mt-2'>
            <div>
              {integrations.map((item, index) => (
                <div key={index} className='border-2 border-gray-400 rounded-md mb-4'>
                  <div
                    className='p-2 cursor-pointer flex justify-between items-center'
                    onClick={() => handleIntegrationsToggle(index)}
                  >
                    <h2 className='text-lg'>{item.title}</h2>
                    <span>{openIntegrations === index ? '-' : '+'}</span>
                  </div>
                  {openIntegrations === index && (
                    <div className='p-4 bg-gray-100'>
                      {item.answers.map((answer, idx) => (
                        <p key={idx} className='mb-2'>{answer}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>}
          {openSection === 'Tickets' && <div className='mt-2'>
            <div>
              {tickets.map((item, index) => (
                <div key={index} className='border-2 border-gray-400 rounded-md mb-4'>
                  <div
                    className='p-2 cursor-pointer flex justify-between items-center'
                    onClick={() => handleTicketsToggle(index)}
                  >
                    <h2 className='text-lg'>{item.title}</h2>
                    <span>{openTickets === index ? '-' : '+'}</span>
                  </div>
                  {openTickets === index && (
                    <div className='p-4 bg-gray-100'>
                      {item.answers.map((answer, idx) => (
                        <p key={idx} className='mb-2'>{answer}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>}
        </div>
      </div>
    </section>
  );
}

export default EmployeeKnowledgeBase;
