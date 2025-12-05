import React, { useState } from "react";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

const GmailComposeModal = ({  onCloseCompose }) => {
  const themeColor = useSelector((state) => state.theme.color);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [toError, setToError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    const emailInfo = {
      To: to,
      Subject: subject,
    };
    const isToValid = validateTo(to);
    const isSubjectValid = validateSubject(subject);
    if (isToValid && isSubjectValid) {
      setIsSending(true); // Show loader
      // Call the sendMessage function with emailInfo and message
      sendMessage(emailInfo, message, composeTidy);
      // setIsSending(false);
      toast.success("Message Sent Successfully")
      onCloseCompose();
    }

    //   onCloseCompose()
  };

  const validateTo = (value) => {
    if (!value) {
      setToError("To is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setToError("Email address is invalid");
      return false;
    } else {
      setToError("");
      return true;
    }
  };

  const validateSubject = (value) => {
    if (!value) {
      setSubjectError("Subject is required");
      return false;
    } else {
      setSubjectError("");
      return true;
    }
  };

  const composeTidy = () => {
    
    setTo("");
    setSubject("");
    setMessage("");
  };

  const sendMessage = (headersObj, messageText, callback) => {
    const email = Object.entries(headersObj)
      .map(([header, value]) => `${header}: ${value}`)
      .join("\r\n");

    const info = JSON.parse(localStorage.getItem("authInfo"));
    const url = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";

    const headers = new Headers({
      Authorization: `Bearer ${info.access_token}`,
      "Content-Type": "application/json",
    });

    // Include the message text in the email body
    const emailBody = `${messageText}`;

    const rawEmail = btoa(`${email}\r\n\r\n${emailBody}`)
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    const requestBody = JSON.stringify({
      raw: rawEmail,
    });

    fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBody,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Email sent successfully.");
          //alert('Email sent successfully.');
        } else {
          console.error("Failed to send email:", response.statusText);
          //alert('Failed to send email. Please try again.');
        }
        callback(); // Callback to tidy up after sending the email
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // alert('Error sending email. Please try again.');
        callback(); // Callback to tidy up after sending the email
      });
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50 p-10">
      <div
        style={{ background: themeColor }}
        className="md:w-auto w-full p-4  flex flex-col rounded-md overflow-auto max-h-[100%] hide-scrollbar"
      >
        <div className="">
          <h4 className="font-medium text-white text-lg my-2">Compose</h4>
        </div>
        <form onSubmit={sendEmail}>
          <div class="flex flex-col w-full gap-2">
            <input
              type="email"
              className=" p-1 px-2 rounded-md outline-none"
              id="compose-to"
              placeholder="To"
              value={to}
              // onChange={(e) => setTo(e.target.value)}
              onChange={(e) => {
                setTo(e.target.value);
                validateTo(e.target.value);
              }}
              onBlur={() => validateTo(to)}
            />
            {toError && <div  className="bg-black px-2 rounded-full text-red-400 w-fit bg-opacity-30">{toError}</div>}

            <input
              type="text"
              spellCheck="true"
              className=" p-1 px-2 rounded-md outline-none"
              id="compose-subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                validateSubject(e.target.value);
              }}
              onBlur={() => validateSubject(subject)}
              required
            />
            {subjectError && <div className="bg-black px-2 rounded-full text-red-400 w-fit bg-opacity-30">{subjectError}</div>}

            <textarea
              className="rounded-md p-1 px-2 outline-none "
              spellcheck="true"
              id="compose-message"
              placeholder="Message"
              rows="10"
              cols={50}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 my-2">
            <button type="submit" id="send-button" className="bg-white px-4 font-medium rounded-full">
              Send
            </button>
            <button
              type="button"
              className="bg-red-400 text-white font-medium px-4 rounded-full"
              data-dismiss="modal"
              onClick={onCloseCompose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GmailComposeModal;
