import React, { useState } from "react";
import { sendForgotOtp, updatePassword, verifyForgotOtp } from "../../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const data = { email: email }; 
      const otpResponse = await sendForgotOtp(data); 
      toast.success("OTP sent");

      // Store email in local storage
      localStorage.setItem("email", email);

      if (otpResponse.status === 200) {

        const otp = otpResponse.data.otp
        alert(`abhinandan! your Otp is here. Just like my patience😜, its about to expire if you dont use it soon: ${otp}`);

        setStep(2); // Move to OTP verification step
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in sending OTP:", error);
      alert("There was an error while sending OTP.");
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      // Get email from local storage
      const emailFromStorage = localStorage.getItem("email");

      const data = { otp: parseInt(otp), email: emailFromStorage };  // Send the OTP and email from local storage
      const otpResponse = await verifyForgotOtp(data);
      
      toast.success("OTP Verified Successfully.");

      if (otpResponse.status === 200) {
        setStep(3); // Move to password reset step
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in verifying OTP:", error);
      alert("There was an error while verifying the OTP.");
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return; // If passwords don't match, stop the process
    }

    try {
      // Get email from local storage
      const emailFromStorage = localStorage.getItem("email");

      const data = { password: password, email: emailFromStorage };  // Send the email and new password
      const response = await updatePassword(data);

      if (response.status === 200) {
        toast.success("Password has been reset successfully!");
        navigate('/login');  // Redirect to login page
        setPassword("");  
        setConfirmPassword("");  // Clear password fields
      } else {
        alert("Error in resetting the password.");
      }
    } catch (error) {
      console.error("Error in password reset:", error);
      alert("There was an error while resetting the password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="mt-4">
            <label className="block text-gray-700">Email Id</label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Get OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="mt-4">
            <label className="block text-gray-700">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}  // Set the entered OTP in state
            />
            <button
              type="submit"
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="mt-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="block text-gray-700 mt-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-500 transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
